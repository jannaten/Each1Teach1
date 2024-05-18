import axios from 'axios';
import DOMPurify from 'dompurify';
import Resizer from 'react-image-file-resizer';
// https://stackoverflow.com/a/20285053
export const toDataURL = async (url, callback) => {
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'blob'
    });
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(response.data);
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

// https://stackoverflow.com/a/43358515
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const objectIsEmpty = (obj) => {
  // Checks if object is empty '{}'
  return !!(
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const isChanged = (current, previous) => {
  // Check if value differs from other / previous value
  let isChanged = false;
  try {
    const previousJSON = JSON.stringify(previous);
    const currentJSON = JSON.stringify(current);
    if (previousJSON !== currentJSON) isChanged = true;
    return isChanged;
  } catch (error) {
    console.error('error: ', error);
    return error;
  }
};

export const arraymove = (arr, fromIndex, toIndex) => {
  // Move item from one index to other in same array
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr;
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export function arrayMoveMutable(array, fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable(array, fromIndex, toIndex) {
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
}

export const truncateText = (text, length) => {
  return !text
    ? ''
    : text.length > length
    ? text.slice(0, length) + ' ...'
    : text;
};

export const createMarkup = (text) => {
  DOMPurify.setConfig({
    ADD_ATTR: ['target']
  });
  return { __html: DOMPurify.sanitize(text) };
};

export const isObject = (value) => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

const dayjs = require('dayjs');
// Returns true if 'betweenDate' is between 'startDate' and 'endDate'
export const isBetweenDates = (
  startDate,
  endDate,
  betweenDate = new Date()
) => {
  const date1 = dayjs(new Date(startDate));
  const date2 = dayjs(new Date(endDate));
  const between = dayjs(new Date(betweenDate));

  const val1 = date1.diff(between);
  const val2 = date2.diff(between);

  return val1 <= 0 && val2 >= 0;
};

export const postAnalytics = async (path, eventType, data) => {
  try {
    await axios.post('/api/analytics', { path, eventType, data });
  } catch (error) {}
};

export const getHeightAndWidthFromDataUrl = (dataURL) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = dataURL;
  });

export const resizeImageFile = (
  file,
  width,
  height,
  formatter,
  quality,
  outputType = 'file'
) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      formatter,
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      outputType
    );
  });

export const generateFormLink = (forms = [], ids) => {
  return forms.map((obj) => {
    const urls = Array.isArray(ids) ? obj.url + ids.join(',') : obj.url + ids;
    return { ...obj, url: urls };
  });
};

export const formatUrl = (url, allowHyphens = true) => {
  if (typeof url !== 'string') return '';
  return url
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, allowHyphens ? '-' : '') // remove/replace spaces
    .replace(/-+/g, allowHyphens ? '-' : ''); // remove/replace consecutive hyphens
};

export const getKeywords = (records, localize) => {
  let keywords = [];

  records?.map((record) => {
    if (
      !keywords.includes(localize.object(record?.data?._source?.localizedName))
    ) {
      keywords.push(localize.object(record?.data?._source?.localizedName));
    }

    if (!keywords.includes(localize.object(record?.type?.name))) {
      keywords.push(localize.object(record?.type?.name));
    }

    const { tags } = record;
    if (tags) {
      tags?.map((tag) => {
        if (!keywords.includes(localize.object(tag?.data?.localizedName))) {
          keywords.push(localize.object(tag?.data?.localizedName));
        }
      });
    }
  });

  return keywords || [];
};

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
