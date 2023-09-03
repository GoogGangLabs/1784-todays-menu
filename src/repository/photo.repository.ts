import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import PhotoEntity from '@entity/photo.entity';
import { BandPhotoDto } from '@domain/band.post.dto';

@Injectable()
class PhotoRepository extends Repository<PhotoEntity> {
  constructor(private dataSource: DataSource) {
    super(PhotoEntity, dataSource.createEntityManager());
  }

  public createByDto = async (photo: BandPhotoDto, postId: string) => {
    await this.createQueryBuilder('photos')
      .insert()
      .into(PhotoEntity)
      .values({
        id: photo.id,
        postId: postId,
        url: photo.url,
        filename: photo.filename,
        width: photo.width,
        height: photo.height,
        timestamp: photo.createdAt.toString(),
      })
      .execute();
  };

  public createByDtoList = async (photoList: BandPhotoDto[], postId: string) => {
    for (const photo of photoList) await this.createByDto(photo, postId);
  };
}

export default PhotoRepository;
