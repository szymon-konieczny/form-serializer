
export class View {

  getFormRoot() {
    const form = document.querySelector('[name="my-form"]');
    return form;
  };

  getFormChildrenSection() {
    const formRoot = this.getFormRoot();
    const formChildrenSection = formRoot.querySelector('.form-content');
    return formChildrenSection;
  };

  bindGetFormValues(handler) {
    const form = this.getFormChildrenSection();

    form.onchange = () => {  
      const parentElement = form.querySelectorAll('[type="radio"]');
      this.disableChildren([...parentElement]);
      const formData = this.getFormData(form);
      handler(formData);
    };
  };

  getFormData(form) {
    const formData = [];

    [...form.elements].map(el => {
      if (el.tagName === 'INPUT') {
        el = {
          type: el.type,
          name: el.name,
          value: el.value,
          checked: el.checked
        };
        return formData.push(el);
      };
    });
    return formData;
  };

  createTemporaryTextarea(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.classList.add('hidden');
  };

  disableChildren(element) {
    element.map(el => {
      const radioChildren = el.parentNode.nextElementSibling;
      const inputs = radioChildren.querySelectorAll('input');
      if (!el.checked) { 
        for (let input of inputs) {
          input.disabled = true;
        };
      } else {
        for (let input of inputs) {
          input.disabled = false;
        };
      };
    });
  };

  getDataInputValue() {
    const dataInputValue = document.querySelector('#input-area').value || '';
    return dataInputValue;
  };

  bindOnFormAction(handler) {
    const form = this.getFormRoot();

    form.addEventListener('click', e => {

      if (e.target.name === 'save') {
        e.preventDefault();
        const data = handler();
        this.createTemporaryTextarea(data);
      };

      if (e.target.name === 'set') {
        e.preventDefault();
        const resetData = this.getDataInputValue();
        handler(resetData);
      };
    });
  };

  setFormState(data) {
    const form = this.getFormRoot();

    [...data].map((input, index) => {
      const elements = [...form.querySelectorAll('input')];
      const tagName = elements[index].tagName;
      const element = elements[index];
      if(tagName === 'INPUT') {
        element.checked = input.checked;
      };
    });
  };
};