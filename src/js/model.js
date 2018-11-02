
export class Model {
  
  stringifyFormData(data) {
    const dataToJSON = JSON.stringify(data, null, 2);
    return dataToJSON;
  };

  parseFormData(data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  };
};