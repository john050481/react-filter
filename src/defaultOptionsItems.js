/*
options for each item:
id: unique id - name property in fakeArray (watch 'generateFakeData.js'), 
type: text/number/select, 
alias: title and placeholder,
disabled: true/false, for input props
hidden: true/false, for input props

if type==='select', then options for select in property 'select'
*/
export const defaultOptionsItems = [
  { id: "id", type: "number", alias: "enter ID" },
  { id: "name", type: "text", alias: "NAME", disabled: true },
  { id: "address", type: "text", alias: "ADDRESS", hidden: true },
  { id: "phone", type: "text", alias: "PHONE" },
  { id: "description", type: "search", alias: "DESCRIPTION" },
  { id: "start", type: "date", alias: "DATE" },
  {
    id: "gate",
    type: "select",
    alias: "The 'alias' option for the GATE is displayed here.",
    select: [
      { alias: "GATE 1", value: "GATE1" },
      { alias: "GATE 2", value: "GATE2" }
    ]
  },
  {
    id: "region",
    type: "select",
    alias:
      "The 'alias' option for the REGION is displayed here.\n Option 'disabled: true'",
    disabled: true,
    select: [
      { alias: "REGION 1", value: "REGION1" },
      { alias: "REGION 2", value: "REGION2" }
    ]
  },
  {
    id: "provider",
    type: "select",
    alias: "The 'alias' option for the PROVIDER is displayed here.",
    select: [
      { alias: "PROVIDER 1", value: "PROVIDER1" },
      { alias: "PROVIDER 2", value: "PROVIDER2" }
    ]
  },
  {
    id: "bool",
    type: "select",
    alias: "The 'alias' option for the BOOL is displayed here.",
    select: [
      { alias: "TRUE/YES", value: true },
      { alias: "FALSE/NO", value: false }
    ]
  }
];

export function getOptionsForItem(id, filter_options) {
  let defaultOptionsForItem = filter_options.find((item, i, arr) => {
    return item.id === id;
  });

  defaultOptionsForItem = defaultOptionsForItem ? defaultOptionsForItem : {};

  let defOption = {
    id: id,
    type: "text",
    alias: String(id).toUpperCase(),
    disabled: false,
    hidden: false
  };

  if (defaultOptionsForItem.type === "select") {
    if (!defaultOptionsForItem.hasOwnProperty("select")) {
      defaultOptionsForItem.select = [];
    }
  }

  return Object.assign(defOption, defaultOptionsForItem);
}