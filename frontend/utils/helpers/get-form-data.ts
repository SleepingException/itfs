export const getFormData = (object: Record<string, string>) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
