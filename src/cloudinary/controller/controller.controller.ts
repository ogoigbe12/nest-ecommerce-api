import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';

export const CloudinaryController = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'process.env.cloud_name',
      api_key: 'process.env.api_key',
      api_secret: 'process.env.api_secret',
    });
  },
};
