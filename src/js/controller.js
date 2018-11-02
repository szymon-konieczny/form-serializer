
export class Controller {
  
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.data = []

    this.view.bindGetFormValues(this.setFormData.bind(this));
    this.view.bindOnFormAction(this.onFormAction.bind(this));
  };

  setFormData(formData) {
    this.data = this.model.stringifyFormData(formData);
  };

  onFormAction(newData) {
    if (newData) {
      this.data = newData;
      return this.setFormState();
    };
    return this.data;
  };

  setFormState() {
    const data = this.model.parseFormData(this.data)
    return this.view.setFormState(data);
  };

};