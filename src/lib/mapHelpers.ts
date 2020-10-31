import axios from "axios";
import dotenv from "dotenv";
import { toast } from "react-toastify";

dotenv.config();

export const getCode = async (address: string) => {
  // 자체 서버를 사용하는 대신 클라이언트가 HTTP 요청을 하는 프록시 서버 링크를 URL에 추가하여 CORS 에러 해결
  const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { data } = await axios(URL);
  if (data.error_message) {
    toast.error(data.error_message);
    return false;
  } else {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) {
      toast.error("No Place");
      return false;
    } else {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
      } = firstPlace;
      return { formatted_address, lat, lng };
    }
  }
};
export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { data } = await axios(URL);
  if (data.error_message) {
    toast.error(data.error_message);
    return false;
  } else {
    const { results } = data;
    const firstPlace = results[0];
    if (firstPlace) {
      return firstPlace!.formatted_address;
    }
  }
};
