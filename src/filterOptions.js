/*
options for each item:
id: unique id - name property in fakeArray (watch 'generateFakeData.js'),
type: text/number/select/date,
alias: title and placeholder,
className: any user css class for input element
disabled: true/false, for input element
hidden: true/false, for input element

if type==='select', then options for select in property 'select' or
options for an select can be in state (you can accept them like 'fetch'),
then you need to specify the path:
  selectInState: {
    link: "selects.select_gate",
    alias: "name",
    value: "id"
  }
*/
export const filterOptions = [
  { id: "id", type: "number", alias: "enter ID" },
  { id: "name", type: "text", alias: "NAME", disabled: true },
  { id: "address", type: "text", alias: "ADDRESS", hidden: true },
  { id: "phone", type: "text", alias: "PHONE", className: "Example__anyClass" },
  { id: "description", type: "search", alias: "DESCRIPTION" },
  { id: "start", type: "date", alias: "DATE" },
  {
    id: "gate",
    type: "select",
    alias: "The 'alias' option for the GATE is displayed here.\n 'options' for a 'select' are retrieved from 'state'",
    selectInState: {
      link: "selects.select_gate",
      alias: "name",
      value: "id"
    }
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
