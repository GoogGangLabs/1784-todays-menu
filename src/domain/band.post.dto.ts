export type PostType = 'weekly' | 'daily' | 'other';
export type DailyPostType = 'launch' | 'dinner';

export interface BandPostConfigurations {
  sequence?: number;
  type?: DailyPostType;
}

export class BandCommentDto {
  content: string;
  createdAt: number;

  public static fromObject = (object: object) => {
    const bandCommentDto = new BandCommentDto();

    bandCommentDto.content = object['body'];
    bandCommentDto.createdAt = object['created_at'];
    return bandCommentDto;
  };

  public static fromObjects = (objects: object[]) => {
    if (!objects || !objects.length) return [];
    return objects.map((object) => this.fromObject(object));
  };
}

export class BandPhotoDto {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  createdAt: number;

  public static fromObject = (object: object, index: number) => {
    const bandPhotoDto = new BandPhotoDto();

    bandPhotoDto.id = object['photo_key'];
    bandPhotoDto.width = object['width'];
    bandPhotoDto.height = object['height'];
    bandPhotoDto.url = object['url'];
    bandPhotoDto.filename = `image${index}.${object['url'].match(/\.([a-zA-Z0-9]+)$/)[1]}`;
    bandPhotoDto.createdAt = object['created_at'];
    return bandPhotoDto;
  };

  public static fromObjects = (objects: object[]) => {
    if (!objects || !objects.length) return [];
    return objects.map((object, idx) => this.fromObject(object, idx));
  };
}

export class BandPostDto {
  id: string;
  content: string;
  createdAt: number;
  photos: BandPhotoDto[];
  comments: BandCommentDto[];
  sequence?: number;
  postType?: PostType;
  dailyPostType?: DailyPostType;

  public static fromObject = (object: object) => {
    const bandPostDto = new BandPostDto();

    bandPostDto.id = object['post_key'];
    bandPostDto.content = object['content'];
    bandPostDto.createdAt = object['created_at'];
    bandPostDto.photos = BandPhotoDto.fromObjects(object['photos']);
    bandPostDto.comments = BandCommentDto.fromObjects(object['latest_comments']);
    return bandPostDto;
  };

  public static fromObjects = (objects: object[]) => {
    if (!objects || !objects.length) return [];
    return objects.map((object) => this.fromObject(object));
  };
}
