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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser, SkipAuth } from '../../common/decorators';
import { IUserData } from '../../common/models';
import { ParseImage } from '../../common/pipes';
import { ImageId } from './models/constants';
import { ImageListQueryDto } from './models/dtos/request';
import { ImageListResponseDto } from './models/dtos/response';
import { ImageMapper } from './services/image.mapper';
import { ImageService } from './services/image.service';

@ApiTags('Image')
@Controller({ path: 'images', version: '1' })
export class ImageController {
  constructor(private imageService: ImageService) {}

  @SkipAuth()
  @ApiOperation({ description: 'Get list of my images' })
  @Get()
  public async getImageList(
    @Query() query: ImageListQueryDto,
  ): Promise<ImageListResponseDto> {
    const result = await this.imageService.getImageList(query);
    return ImageMapper.toResponseListDto(result, query);
  }

  @ApiOperation({ description: 'Upload images and videos' })
  @UseInterceptors(ParseImage)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('upload')
  public async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: IUserData,
  ): Promise<void> {
    await this.imageService.uploadFiles(files, user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete image' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:${ImageId}`)
  public async deleteImage(
    @CurrentUser() user: IUserData,
    @Param(ImageId) imageId: string,
  ): Promise<void> {
    await this.imageService.deleteImage(user.userId, imageId);
  }
}
