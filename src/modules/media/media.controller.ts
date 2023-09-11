import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { LocalFilesInterceptor } from '../storage/file.interseptor';
import { ImageId } from './models/constants';
import { MediaListQueryDto } from './models/dtos/request';
import { MediaListResponseDto } from './models/dtos/response';
import { MediaMapper } from './services/media.mapper';
import { MediaService } from './services/media.service';

@ApiBearerAuth()
@ApiTags('Media')
@Controller({ path: 'media', version: '1' })
export class MediaController {
  constructor(private imageService: MediaService) {}

  @ApiOperation({ description: 'Get list of my videos and images' })
  @Get()
  public async getImageList(
    @Query() query: MediaListQueryDto,
  ): Promise<MediaListResponseDto> {
    const result = await this.imageService.getMediaList(query);
    return MediaMapper.toResponseListDto(result, query);
  }

  @ApiOperation({ description: 'Upload images and videos' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(LocalFilesInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('upload')
  public async uploadMedia(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @UploadedFiles() files: Array<Express.Multer.File>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    // await this.imageService.uploadMediaFiles(files, user.userId);
  }

  @ApiOperation({ description: 'Delete video or image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${ImageId}`)
  public async deleteImage(
    @CurrentUser() user: IUserData,
    @Param(ImageId) imageId: string,
  ): Promise<void> {
    await this.imageService.deleteMedia(user.userId, imageId);
  }
}
