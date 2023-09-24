import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { Logger } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { I18nPath, I18nTranslations } from '../http/i18n/i18n.generated';
import { LoggerContextEnum } from '../models';

export class TranslationHelper {
  public static t<
    C extends keyof I18nTranslations,
    K extends keyof I18nTranslations[C],
  >(context: C, key: K, metadata?: { [key: string]: string | number }): string {
    return I18nContext.current<I18nTranslations>().t(
      `${context}.${key.toString()}` as I18nPath,
      { args: metadata },
    );
  }

  public static cb<
    C extends keyof I18nTranslations,
    K extends keyof I18nTranslations[C],
  >(
    context: C,
    key: K,
    metadata?: { [key: string]: string | number },
  ): () => string {
    return () => this.t(context, key, metadata);
  }

  public static async compareKeys(): Promise<void> {
    try {
      const state = await this.getKeysFromFiles();

      const stack = this.getDifferenceStack(state);
      const stringOfStack = JSON.stringify(stack, null, 2).replace(/"/g, '');

      if (stack.length) {
        Logger.warn(stringOfStack, LoggerContextEnum.i18nSyncFiles);
      }
    } catch (err) {
      Logger.error(err.message, LoggerContextEnum.i18nSyncFiles);
    }
  }

  private static getDifferenceStack(state: unknown): string[] {
    const stack: string[] = [];
    const allLanguages = Object.keys(state);

    const keysToCheck = Object.keys(state[allLanguages[0]]);
    for (const context of keysToCheck) {
      for (const curLang of allLanguages) {
        const curKeys: Set<string> = new Set(state[curLang][context]);

        for (const compLang of allLanguages) {
          if (curLang !== compLang) {
            const compKeys: Set<string> = new Set(state[compLang][context]);
            const notExistedKeys = Array.from(curKeys).filter(
              (value) => !compKeys.has(value),
            );
            if (notExistedKeys.length) {
              stack.push(
                this.buildMessage(compLang, curLang, context, notExistedKeys),
              );
            }
          }
        }
      }
    }
    return stack;
  }

  /**
   * @returns - structure:
   * {
   * "errors": {
   *     "en": {
   *       "ua": []
   *     },
   *     "ua": {
   *       "en": []
   *     }
   *   } ...
   * }
   */
  private static async getKeysFromFiles(): Promise<unknown> {
    const i18nDir = path.join(
      process.cwd(),
      'src',
      'common',
      'http',
      'i18n',
      'constants',
    );
    const languagesArray = await fs.readdir(i18nDir);

    const state = {};
    for (const lang of languagesArray) {
      state[lang] = {};
      const langDir = path.join(i18nDir, lang);
      const files = await fs.readdir(langDir);

      for (const file of files) {
        const files = await fs.readFile(path.join(langDir, file), 'utf-8');
        const data = JSON.parse(files);
        const context = file.split('.')[0];
        state[lang][context] = Object.keys(data);
      }
    }

    return state;
  }

  private static buildMessage(
    compLang: string,
    curLang: string,
    context: string,
    notExistedKeys: string[],
  ): string {
    const notExistedString = notExistedKeys.join(', ');
    return `In language "${compLang}" according to "${curLang}" in context "${context}" absent those keys : [${notExistedString}]`;
  }
}
