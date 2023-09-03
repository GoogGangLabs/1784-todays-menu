import axios from 'axios';

import Environ from '@config/environment';
import { BandPostDto } from '@domain/band.post.dto';

class BandStrategy {
  private static readonly bandQuery = {
    access_token: Environ.BAND_TOKEN,
    band_key: Environ.BAND_KEY,
  };

  public static getPostList = async (): Promise<BandPostDto[]> => {
    const postList = (await axios.get(Environ.BAND_URL, { params: this.bandQuery })).data.result_data.items as object[];
    return BandPostDto.fromObjects(postList);
  };
}

export default BandStrategy;
