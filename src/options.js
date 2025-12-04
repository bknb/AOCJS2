export const list = (name) => {
  const option = {type: 'list', name, choices: [],
                  message: 'Please select an option'};
  let i = 0;
  const result = () => option;
  result.message = (msg) => {
    option.message = msg;
    return result;
  };
  result.add = (choice, value, condition) => {
    if (condition === undefined || condition)
      option.choices.push({name: choice, value: value || i});
    return result;
  };
  result.default = (value) => {
    option.default = value;
    return result;
  };
  result.choices = (choices) => {
    option.choices = choices;
    return result;
  };
  return result;
};

export const input = (name) => {
  const option = {type: 'input', name,
                  message: 'Please input an option'};
  const result = () => option;
  result.message = (msg) => {
    option.message = msg;
    return result;
  };
  result.default = (value) => {
    option.default = value;
    return result;
  };
  result.validate = (fn) => {
    option.validate = fn;
    return result;
  };
  return result;
}

export const confirm = (name) => {
  const option = {type: 'confirm', name,
                  message: 'Please confirm'};
  const result = () => option;
  result.message = (msg) => {
    option.message = msg;
    return result;
  };
  return result;
}

export const checkbox = (name, answer) => {
  const option = {type: 'checkbox', name, choices: [],
                  message: 'Please select options',
                  askAnswered: true};
  const result = () => option;
  result.default = (value) => {
    option.default = value;
    return result;
  };
  result.message = (msg) => {
    option.message = msg;
    return result;
  };
  result.add = (name, value, checked = true) => {
    checked = answer.options?.includes(value) ?? checked;
    option.choices.push({name, value, checked});
    return result;
  }
  return result;
};