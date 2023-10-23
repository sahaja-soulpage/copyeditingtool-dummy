export const editorStyle = () => {
  return `
.mce-content-body table[data-mce-selected] {
  outline :0;
}

.mce-content-body div.mce-resizehandle {
background-color: transparent !important;
border-color: transparent !important;
}

*[id="split"] {
width: 100%;
display: flex;
justify-content:center;
text-wrap: nowrap;
gap: 1em;
padding: 1rem 0;
background: #73ed7326;
color: green;
font-size: 1rem;
font-style: normal;
font-weight: 400;
}

*[id*="xdx_"] {
--corner-width: 0.25em;
--corner-color: #209CFC;
background: linear-gradient(to right, var(--corner-color) var(--corner-width), transparent var(--corner-width)) 0 0, linear-gradient(to left, var(--corner-color) var(--corner-width), transparent var(--corner-width)) 100% 100%, linear-gradient(to bottom, var(--corner-color) var(--corner-width), transparent var(--corner-width)) 0 0, linear-gradient(to top, var(--corner-color) var(--corner-width), transparent var(--corner-width)) 100% 100%;
background-repeat: no-repeat;
background-size: 10px 10px;
padding: 0.125em 0.25em;
}

*[data-autotag="true"] {
--corner-color: #dbab25;
}

// *[id*="xdx_"] {
// --corner-color: #209CFC;
// text-decoration-line: overline underline;
// text-decoration-style: double;
// text-decoration-color: var(--corner-color);
// }


// *[id*="xdx_"] {
// --corner-size: 0.375em;
// --border-width: 0.25em;
// --border-color: #209CFC;
// position: relative;
// padding: 0.1em 0.25em 0 0.25em;
// }

// *[id*="xdx_"]::before,
// *[id*="xdx_"]::after {
// content: "";
// position: absolute;
// width:var(--corner-size);
// height:var(--corner-size);
// border:var(--border-width) solid var(--border-color);
// }

// *[id*="xdx_"]::before {
// left: 0;
// top: 0;
// border-bottom:none;
// border-right:none;
// }
    
// *[id*="xdx_"]::after{
// bottom: -1px;
// right: 0;
// border-left:none;
// border-top:none;
// }`;
};

export const selectStyle = (font: any, height: any) => {
  return {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "4px",
      minHeight: "32px",
      fontSize: font,
      boxShadow: state.isFocused ? null : null,
      ":hover": {
        borderColor: "var(--primary)",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      maxHeight: height,
      fontSize: font,
      padding: "0 6px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
      fontSize: font,
    }),

    placeholder: (provided: any) => ({
      ...provided,
      position: "center",
      transform: "none",
      color: "var(--color-light) !important",
    }),

    menu: (base: any) => ({
      ...base,
      fontSize: font,
      margin: "0 !important",
    }),
    menuList: (base: any) => ({
      ...base,
      padding: "0 !important",
    }),

    option: (base: any) => ({
      ...base,
      color: "#212529",
      backgroundColor: "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "var(--hover)",
      },
    }),

    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      maxHeight: height,
    }),
  };
};

export const exclude = (data, keys) =>
  Object.fromEntries(Object.entries(data).filter(([key]) => !keys.includes(key)));

export const include = (obj, keys) =>
  Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]]));

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getLabel = (label = "") => {
  return label
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(" ");
};

export const userPermissionLabels = (lb) => {
  if (lb === "assign") return "Assign Files";
  if (lb === "upload") return "Upload Files";
  if (lb === "edit") return "Edit Files";
  if (lb === "delete") return "Delete Files";
  if (lb === "generate") return "Generate iXBRL";
  if (lb === "download") return "Download Package";
  if (lb === "update") return "Update Taxonomy";
  if (lb === "split") return "Split & Merge Files";
  return "";
};

export const hasPermission = (user, lb) => {
  return (
    user?.globalSuperAdmin ||
    ["SuperAdmin", "Admin"].includes(user?.role) ||
    (user?.permissions && user.permissions[lb]) ||
    false
  );
};

export const dateFormat = (date) => {
  return date
    ? new Date(date)
        .toLocaleString("default", {
          dateStyle: "long",
          timeStyle: "short",
          hour12: true,
        })
        .replace("at", "|")
        .replace("00:", "12:")
    : "-";
};

export const hideNav = (lb, user) => {
  let hide = false;
  if (
    ["Users", "Service Providers", "Clients"].includes(lb) &&
    (!user?.role || user?.role === "User")
  )
    hide = true;
  if (
    lb === "Service Providers" &&
    (!user?.profile ||
      user?.profile.type === "client" ||
      (user?.role === "Admin" && user?.profile.type === "apex"))
  )
    hide = true;

  if (
    lb === "Clients" &&
    (!user?.profile ||
      (user?.role === "Admin" && ["apex", "serviceProvider"].includes(user?.profile.type)))
  )
    hide = true;

  return hide;
};

export const btns = () => [
  { lb: "Clear Auto-Tagging", ty: "btn" },
  { lb: "Settings", ty: "btn" },
  {
    lb: "Split",
    ty: "drp",
    ops: [{ lb: "Add Split" }, { lb: "Remove Split" }, { lb: "Share Files" }],
  },
  { lb: "Validate", ty: "btn" },
  { lb: "Preview", ty: "drp", ops: [{ lb: "XBRL Preview" }, { lb: "iXBRL Preview" }] },
  { lb: "Submit", cls: "btn-mprimary", ty: "btn" },
  { lb: "Create iXBRL", cls: "btn-primary", ty: "btn" },
];

export const fns = () => [
  { lb: "Inline Fact", ty: "btn" },
  { lb: "Inline Label", ty: "btn" },
  { lb: "Block Fact", ty: "btn" },
  { lb: "Mark As Table", ty: "btn" },
  {
    lb: "Row Element",
    ty: "drp",
    ops: [{ lb: "Row with Element" }, { lb: "Row with Context" }, { lb: "Row with Date" }],
  },
  {
    lb: "Column Context",
    ty: "drp",
    ops: [
      { lb: "Column with Element" },
      { lb: "Column with Context" },
      { lb: "Column with Dimension" },
    ],
  },
  { lb: "Level 1", ty: "btn" },
  { lb: "Level 2", ty: "btn" },
  { lb: "Level 3", ty: "btn" },
  {
    lb: "Calculation",
    ty: "drp",
    ops: [{ lb: "Calculation Editor" }],
  },
  {
    lb: "Footnotes",
    ty: "drp",
    ops: [
      { lb: "Footnote Id" },
      { lb: "Footnote Text" },
      { lb: "Footnote Reference" },
      { lb: "Footnote Row" },
      { lb: "Footnote Column" },
      { lb: "Footnote Table" },
    ],
  },
  { lb: "Tools", ty: "drp", ops: [{ lb: "Exclude Block" }] },
  { lb: "Search", cls: "bg-layout rounded-pill ms-2 px-2", ty: "input" },
];

export const tagNames = (nodeName) => {
  if (nodeName === "BODY") return "BODY:Body of Document";
  if (nodeName === "TABLE") return "TABLE -Table";
  if (nodeName === "TR") return "TR - Row(block)";
  if (nodeName === "TD") return "TD - Data Cell(block)";
  if (nodeName === "DIV") return "DIV - Block Container(block)";
  if (nodeName === "P") return "P - Paragraph (block)";
  if (nodeName === "STRONG") return "STRONG (inline)";
  if (nodeName === "SPAN") return "SPAN (inline)";
  if (nodeName === "B") return "B - Bold (inline)";
  if (nodeName === "FONT") return "FONT - Font Style(inline)";
  if (nodeName === "A") return "A - HyperText Link(inline)";
  return nodeName;
};

export const pickProperties = (tag) => {
  const data = { ["XBRL XDX Type"]: tag["XBRL XDX Type"] };
  if (tag["Element"]) data["Element"] = tag["Element"];
  if (tag["Calculation"]) data["Calculation"] = tag["Calculation"];
  if (tag["Presentation Table Type"]) data["Param 01"] = tag["Presentation Table Type"];
  if (tag["Indent"]) data["Indenting"] = tag["Indent"];
  if (tag["P"]) data["Precision"] = tag["P"];
  if (tag["Display"]) data["Display"] = tag["Display"];
  if (tag["Unit"]) data["Unit"] = tag["Unit"];
  if (tag["References"]) data["Footnotes"] = tag["References"];
  if (tag["Context"]) data["Context"] = tag["Context"];
  if (tag["uniqueId"]) data["UniqueId"] = tag["uniqueId"];
  if (tag["id"]) data["id"] = tag["id"];

  return data;
};

export const getElements = (parentNode) => {
  const styles = parentNode.getAttribute("style") || "";
  const xdx = parentNode.getAttribute("id") || "";
  const xdx_title = parentNode.getAttribute("title") || "";

  const properties = [];
  const styleObj = {};
  styles.split(";").forEach((part) => {
    const [lb, vl] = part.trim().split(":");
    if (lb && vl) {
      const val = getLabel(vl || "");
      if (lb === "font") {
        const values = val.split("pt") || [];
        properties.push({ lb: "Font Name", val: values[1] || "" });
        properties.push({ lb: "Font Size", val: (values[0] || "0") + "pt" });
      } else if (lb === "text-align") {
        properties.push({ lb: "Align", val });
      } else if (lb.includes("margin")) {
        styleObj[lb.trim()] = val.trim();
      } else if (lb === "text-decoration") {
        properties.push({ lb: "Decoration", val });
      } else {
        properties.push({ lb: getLabel(lb), val });
      }
    }
  });

  if (styleObj["margin-top"] || styleObj["margin-bottom"])
    properties.push({
      lb: "Margin T/B",
      val: `${styleObj["margin-top"] || ""} ${styleObj["margin-bottom"] || ""}`,
    });

  if (xdx.includes("xdx_")) {
    properties.push({ lb: "XBRL XDX Type", val: pickProperties(parseId(xdx)) });
    if (xdx_title) properties.push({ lb: "Title", val: xdx_title });
    properties.push({ lb: "ID", val: xdx });
  }

  return { title: tagNames(parentNode.nodeName), properties };
};

export const htmlData = async (file) => {
  const url = file.extra?.url || file.url;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const htmlData = new TextDecoder().decode(buffer);
  // const htmlData = new TextDecoder("ISO-8859-1").decode(buffer);

  return htmlData;
};

export const generateContext = (selectedValues) => {
  let context = "";
  if (selectedValues["Date"]) {
    context += "_c" + selectedValues["Date"].replaceAll("-", "");

    if (selectedValues["Type"] === "duration" && selectedValues["End Date"])
      context += "__" + selectedValues["End Date"].replaceAll("-", "");
  } else if (selectedValues["Dimension"]?.length > 0) context += "_h";

  if (selectedValues["Dimension"]?.length > 0)
    selectedValues["Dimension"].map(
      (e, id) =>
        (context +=
          (!selectedValues["Date"] && id === 0 ? "" : "__") +
          e.replace(":", "--") +
          "__" +
          selectedValues["Member"][id].replace(":", "--"))
    );
  return context;
};

export const generateId = (fn, selectedValues, tag) => {
  let newId = "xdx_" + tagCode(fn, "lb") + randomLetter();

  if (selectedValues["Presentation Table Type"])
    newId += "_" + selectedValues["Presentation Table Type"];

  if (selectedValues["Element"])
    newId += "_e" + selectedValues["Element"]["name"].replace(":", "--");

  const indents = ["Indenting", "Negated", "Heading", "Total Line"];
  const indent = [
    { lb: "Indenting", vl: "Indenting" },
    { lb: "Negated", vl: "N" },
    { lb: "Heading", vl: "B" },
    { lb: "Total Line", vl: "T" },
  ];

  if (Object.keys({ ...include(selectedValues, indents) }).length > 0)
    newId +=
      "_i" +
      indent
        .map((e) =>
          e.lb === "Indenting" ? selectedValues[e.vl] || "" : selectedValues[e.lb] ? e.vl : ""
        )
        .join("");

  if (selectedValues["Precision"] || selectedValues["Counted As"])
    newId += "_p" + (selectedValues["Precision"] || "d") + (selectedValues["Counted As"] || "d");

  if (selectedValues["Negated"]) newId += "_di";

  if (selectedValues["Unit"]) newId += "_u" + selectedValues["Unit"];

  if (selectedValues["References"])
    newId += "_f" + Buffer.from(selectedValues["References"]).toString("hex");

  newId += generateContext(selectedValues);

  (selectedValues["Calculation"] || []).map((e) => {
    newId += "_m" + e;
  });

  newId += "_" + tag.uniqueId;

  return newId;
};

export const parseContext = (ctxt) => {
  const result: any = { Date: "", "End Date": "", Dimension: [], Member: [] };
  const contextParts = ctxt.split("_");
  const getCDate = (dte) =>
    dte.substring(0, 4) + "-" + dte.substring(4, 6) + "-" + dte.substring(6, 8);
  if (Number(contextParts[0])) {
    result.Date = getCDate(contextParts[0]);
    result.Type = "instant";
    contextParts.shift();
  }
  if (contextParts.length > 0 && Number(contextParts[0])) {
    result["End Date"] = getCDate(contextParts[0]);
    result.Type = "duration";
    contextParts.shift();
  }

  for (let j = 0; j < contextParts.length; j++) {
    const contextPart = contextParts[j];
    if (j % 2 === 0) result.Dimension = [...result.Dimension, contextPart.replace("--", ":")];
    else result.Member = [...result.Member, contextPart.replace("--", ":")];
  }
  return result;
};

export const parseDimension = (ctxt) => {
  const result: any = { Dimension: [], Member: [] };
  const contextParts = ctxt.split("_");

  for (let j = 0; j < contextParts.length; j++) {
    const contextPart = contextParts[j];
    if (j % 2 === 0) result.Dimension = [...result.Dimension, contextPart.replace("--", ":")];
    else result.Member = [...result.Member, contextPart.replace("--", ":")];
  }
  return result;
};

export const parseId = (id: any) => {
  const parts = id.split(/(?<!_)_(?!_)/);

  let result: any = { id, Dimension: [], Member: [], Calculation: [] };

  if (parts.length > 2 && parts[1].length === 3) {
    const typ = tagCode(parts[1].substring(0, 2), "vl");
    if (typ) result["XBRL XDX Type"] = typ;
  }

  for (let i = 2; i < parts.length - 1; i++) {
    const part = parts[i];

    if (part.charAt(0) === "e") result.Element = part.replace("--", ":").substring(1);
    else if (part.charAt(0) === "i") {
      result.Indent = part.slice(1);
      if (part.charAt(1) === "0") result.Indenting = part.slice(1, 3);
      if (part.includes("N")) result.Negated = true;
      if (part.includes("B")) result.Heading = true;
      if (part.includes("T")) result["Total Line"] = true;
    } else if (part.charAt(0) === "p") {
      result.P = part.slice(1);
      result.Precision = ["d", "i"].includes(part.charAt(1)) ? part.charAt(1) : part.slice(1, 3);
      result["Counted As"] = part.replace("p" + result.Precision, "");
    } else if (part.charAt(0) === "d") result.Display = part.substring(1);
    else if (part.charAt(0) === "u") result.Unit = part.substring(1);
    else if (part.charAt(0) === "f")
      result.References = Buffer.from(part.substring(1), "hex").toString();
    else if (part.charAt(0) === "c") {
      result.Context = part.replaceAll("__", "_").substring(1);
      const data = parseContext(result.Context);
      result = { ...result, ...data };
    } else if (part.charAt(0) === "h") {
      result.Dimension = part.replaceAll("__", "_").substring(1);
      const data = parseDimension(result.Dimension);
      result = { ...result, ...data };
    } else if (part.charAt(0) === "m")
      result.Calculation = [...result.Calculation, part.substring(1)];
    else if (i === 2 && part.length === 3 && Number(part))
      result["Presentation Table Type"] = parts[2];
    else result[part.charAt(0)] = part.substring(1);
  }

  result["uniqueId"] = parts[parts.length - 1];

  return result;
};

export const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

export const tagsArray = [
  { lb: "Inline Fact", vl: "90" },
  { lb: "Inline Label", vl: "91" },
  { lb: "Block Fact", vl: "98" },
  { lb: "Row with Element", vl: "40" },
  { lb: "Row with Context", vl: "41" },
  { lb: "Row with Date", vl: "43" },
  { lb: "Column with Element", vl: "48" },
  { lb: "Column with Context", vl: "49" },
  { lb: "Column with Dimension", vl: "4B" },
  { lb: "Level 1 Disclosure", vl: "80" },
  { lb: "Level 1 Disclosure End", vl: "81" },
  { lb: "Level 1 Disclosure Label", vl: "82" },
  { lb: "Level 2 Disclosure", vl: "84" },
  { lb: "Level 2 Disclosure End", vl: "85" },
  { lb: "Level 2 Disclosure Label", vl: "86" },
  { lb: "Level 3 Disclosure Start", vl: "89" },
  { lb: "Level 3 Disclosure End", vl: "8A" },
  { lb: "Level 3 Disclosure Label", vl: "8B" },
  { lb: "Statement", vl: "30" },
  { lb: "Level 3 Fact (Single Table)", vl: "88" },
  { lb: "Level 3 Fact (First of Many)", vl: "89" },
  { lb: "Footnote Id", vl: "F0" },
  { lb: "Footnote Text", vl: "F1" },
  { lb: "Footnote Reference", vl: "F2" },
  { lb: "Footnote Row", vl: "F4" },
  { lb: "Footnote Column", vl: "F5" },
  { lb: "Footnote Table", vl: "F6" },
  { lb: "Exclude Block", vl: "23" },
];

export const tagsFilters = [
  { lb: "All Tags", vl: [] },
  { lb: "Inline Fact", vl: ["90"] },
  { lb: "Inline Label", vl: ["91"] },
  { lb: "Block Fact", vl: ["98"] },
  { lb: "Row Element", vl: ["40", "41", "43"] },
  { lb: "Column Context", vl: ["48", "49", "4B"] },
  { lb: "Level 1", vl: ["80", "81", "82"] },
  { lb: "Level 2", vl: ["84", "85", "86"] },
  { lb: "Level 3", vl: ["89", "8A", "8B"] },
  { lb: "Mark as Table", vl: ["30", "88", "89"] },
  { lb: "Footnote", vl: ["F0", "F1", "F2", "F4", "F5", "F6"] },
  { lb: "Exclude Block", vl: ["23"] },
];

export const tagCode = (fn, typ) => {
  const opp = (ty) => (ty === "lb" ? "vl" : "lb");
  return (tagsArray.find((e) => e[typ] == fn) || { lb: "", vl: "" })[opp(typ)];
};

export const allowedKeys = [
  "Control",
  "Shift",
  "PageUp",
  "PageDown",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
];

export const allowedCtrlKeys = [
  "c",
  "PageUp",
  "PageDown",
  "ArrowUp",
  "ArrowDown",
  "ArrowRight",
  "ArrowLeft",
];

export const fields = [
  { lb: "Element", typ: "async" },
  { lb: "Data Type", typ: "input" },
  { lb: "Period", typ: "select" },
  { lb: "Balance", typ: "select" },
  { lb: "Unit", typ: "select" },
];

export const display = [
  { lb: "Period Match", typ: "select" },
  { lb: "Indenting", typ: "select" },
  { lb: "Precision", typ: "select" },
  { lb: "Counted As", typ: "select" },
  { lb: "", typ: "radio" },
  { lb: "Label", typ: "input" },
];

export const context = [
  { lb: "Use Preset", typ: "select" },
  { lb: "Type", typ: "select" },
  { lb: "Date", typ: "date" },
  { lb: "End Date", typ: "date" },
];

export const extended = [
  { lb: "Dimension", typ: "async" },
  { lb: "Member", typ: "async" },
];

export const footerNotes = ["References"];

export const checkboxes = ["Negated", "Total Line", "Heading"];

export const restrictFields = (fn) => {
  const labels = (arr) => arr.map((e) => e.lb);

  if (fn === "Inline Label") return ["Element", "Label"];
  else if (["Inline Fact", "Block Fact"].includes(fn))
    return [
      ...labels(fields),
      ...labels(display),
      ...labels(context),
      ...labels(extended),
      ...footerNotes,
      ...checkboxes,
    ];
  else if (["Row with Element", "Column with Element"].includes(fn))
    return [...labels(fields), ...labels(display), ...labels(extended), ...checkboxes];
  else if (["Row with Context", "Column with Context"].includes(fn))
    return [...labels(context), ...labels(extended)];
  else if (["Row with Date"].includes(fn))
    return [
      ...labels(fields),
      ...labels(display).filter((e) => e !== "Label"),
      ...labels(context),
      ...labels(extended),
    ];
  else if (["Column with Dimension"].includes(fn)) return [...labels(extended)];
  else if (fn.includes("Level ") && fn.includes("Disclosure")) {
    if (fn.includes("End") || fn.includes("Label")) return ["Level Type"];
    return ["Level Type", "Element", ...labels(extended)];
  } else if (["Statement"].includes(fn))
    return ["Table Type", "Presentation Table Type", "Name", "Precision", "Counted As"];
  else if ([markTableOptions[1], markTableOptions[2]].includes(fn))
    return ["Table Type", "Name", "Element", "Precision", "Counted As"];
  else if (footnoteOptions.includes(fn)) return ["Footnote Type"];
  else if (fn === "Calculation Editor") return ["For Element", "Identifier", "Relation to result"];
  else return [];
};

export const hasCommonElement = (arr1, arr2) => {
  const set2 = new Set(arr2);

  return arr1.some((element) => set2.has(element?.lb ? element.lb : element));
};

export const defaultFieldValues = () => {
  return { id: "", Dimension: [], Member: [], Calculation: [] };
};

export const getUrl = (dt) => {
  const urlSplits = dt.url.split("/");
  const urlName = urlSplits[urlSplits.length - 1];
  const key = urlName.split(".")[0] + "_1." + urlName.split(".")[1];
  return key;
};

export const userIndex = (row, user) => row?.fileUsers?.findIndex((e) => e?.userId === user?.id);

export const editRoute = (row, user) => {
  let routePath = "";

  if (row?.fileId && row?.fileUsers?.length > 0 && userIndex(row, user) === 0)
    routePath = `/my-files/${row?.fileId}?splitFile=${row.id}`;
  else if (
    (row?.fileUsers?.length > 1 && userIndex(row, user) === 0 && row?.splitFiles.length === 0) ||
    userIndex(row, user) === -1
  )
    routePath = "";
  else if (row?._count?.splitFiles === 0) routePath = `/my-files/${row?.id}`;
  else if (row?.splitFiles.length > 0)
    routePath = `/my-files/${row?.id}?splitFile=${
      row.splitFiles.sort(function (a, b) {
        return Number(a?.extra?.split) - Number(b?.extra?.split);
      })[0].id
    }`;

  return routePath;
};

export const extraIxbrlTags = () => {
  return [
    { lb: "Label", vl: "title" },
    { lb: "Name", vl: "SUMMARY" },
  ];
};

export const replaceSpecialChars = (txt) => {
  return txt.replaceAll(`'`, "&apos;").replaceAll(`"`, "&quot;");
};

export const markTableOptions = [
  "Statement",
  "Level 3 Fact (Single Table)",
  "Level 3 Fact (First of Many)",
];

export const footnoteOptions = [
  "Footnote Id",
  "Footnote Text",
  "Footnote Reference",
  "Footnote Row",
  "Footnote Column",
  "Footnote Table",
];

export const yearly = [
  { label: "3 Months Ended 3/31", value: "3 Months Ended 3/31" },
  { label: "6 Months Ended 6/30", value: "6 Months Ended 6/30" },
  { label: "9 Months Ended 9/30", value: "9 Months Ended 9/30" },
  { label: "12 Months Ended 12/31", value: "12 Months Ended 12/31" },
];

export const quarterly = [
  { label: "3 Months Ended 6/30", value: "3 Months Ended 6/30" },
  { label: "6 Months Ended 9/30", value: "6 Months Ended 9/30" },
  { label: "9 Months Ended 3/31", value: "9 Months Ended 3/31" },
  { label: "12 Months Ended 6/30", value: "12 Months Ended 6/30" },
];

export const halfyearly = [
  { label: "3 Months Ended 9/30", value: "3 Months Ended 9/30" },
  { label: "6 Months Ended 12/31", value: "6 Months Ended 12/31" },
  { label: "9 Months Ended 12/31", value: "9 Months Ended 9/31" },
  { label: "12 Months Ended 3/31", value: "12 Months Ended 3/31" },
];

export const trimester = [
  { label: "3 Months Ended 12/31", value: "3 Months Ended 12/31" },
  { label: "6 Months Ended 3/31", value: "6 Months Ended 3/31" },
  { label: "9 Months Ended 6/30", value: "9 Months Ended 6/30" },
  { label: "12 Months Ended 3/31", value: "12 Months Ended 3/31" },
];

export const groupedOptions = [
  {
    label: "--FYE 12/31",
    options: yearly,
  },
  {
    label: "--FYE 3/31",
    options: quarterly,
  },
  {
    label: "--FYE 6/30",
    options: halfyearly,
  },
  {
    label: "--FYE 9/30",
    options: trimester,
  },
];

export const defaults = [
  { lb: "CIK", vl: "cik", req: true },
  { lb: "Period", vl: "period", req: true },
  { lb: "Domain", vl: "companyWebsite", req: true },
  { lb: "Ticker/Identifier", vl: "ticker", req: true },
];

export const nameSpaces = [
  { lb: "URI", vl: "companyWebsite", req: false },
  { lb: "Identifier", vl: "ticker", req: false },
];

export const reportPeriods = [
  { lb: "Preset", vl: "preset", req: false },
  { lb: "Report Period", vl: "reportPeriod", req: true },
];

export const options: any = (ty) => {
  return ty === "Status"
    ? [
        { label: "Active", value: "Active" },
        { label: "Pending", value: "Pending" },
        { label: "Inactive", value: "Inactive" },
      ]
    : ty === "Management Role"
    ? [
        { label: "SuperAdmin", value: "SuperAdmin" },
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
      ]
    : ty === "Role"
    ? [
        { label: "Apex", value: "apex" },
        { label: "ServiceProvider", value: "serviceProvider" },
        { label: "Client", value: "client" },
      ]
    : ty === "File Status"
    ? [
        { label: "Conversion Successful", value: "Success" },
        { label: "Conversion Pending", value: "Pending" },
        { label: "Conversion Failed", value: "Failed" },
      ]
    : ["Period", "Type"].includes(ty)
    ? [
        { label: "Duration", value: "duration" },
        { label: "Instant", value: "instant" },
      ]
    : ty === "Balance"
    ? [
        { label: "Unspecified", value: "" },
        { label: "Debit", value: "debit" },
        { label: "Credit", value: "credit" },
      ]
    : ["Deprecated", "Abstract"].includes(ty)
    ? [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ]
    : ty === "Period Match"
    ? [{ label: "Don't Match", value: "" }]
    : ty === "Indenting"
    ? [
        { label: "0 (none)", value: "" },
        { label: "1", value: "01" },
        { label: "2", value: "02" },
        { label: "3", value: "03" },
        { label: "4", value: "04" },
        { label: "5", value: "05" },
      ]
    : ty === "Precision"
    ? [
        { label: "default", value: "" },
        { label: "Infinite", value: "i" },
        { label: "0 (Ones)", value: "p0" },
        { label: "-3 (Thousands)", value: "n3" },
        { label: "-6 (Millions)", value: "n6" },
        { label: "-9 (Billions)", value: "n9" },
        { label: "-------------", value: "" },
        { label: "-1(Tens)", value: "n1" },
        { label: "-2(Hundreds)", value: "n2" },
        { label: "-4(Ten Thousands)", value: "n4" },
        { label: "-5(Hundred Thousands)", value: "n5" },
        { label: "-7(Ten Millions)", value: "n7" },
        { label: "-8(Hundred Millions)", value: "n8" },
        { label: "-------------", value: "" },
        { label: "1 (Tenths)", value: "p1" },
        { label: "2 (Hundredths)", value: "p2" },
        { label: "3 (Thousandths)", value: "p3" },
        { label: "4 (Ten Thousandths)", value: "p4" },
        { label: "5 (Hundred Thousandths)", value: "p5" },
        { label: "6 (Millionths)", value: "p6" },
        { label: "7 (Ten Millionths)", value: "p7" },
        { label: "8 (Hundred Millionths)", value: "p8" },
        { label: "9 (Billionths)", value: "p9" },
      ]
    : ty === "Counted As"
    ? [
        { label: "default", value: "" },
        { label: "0 (As Entered)", value: "p0" },
        { label: "-3 (Thousands)", value: "n3" },
        { label: "-6 (Millions)", value: "n6" },
        { label: "-9 (Billions)", value: "n9" },
        { label: "-------------", value: "" },
        { label: "-1(Tens)", value: "n1" },
        { label: "-2(Hundreds)", value: "n2" },
        { label: "-4(Ten Thousands)", value: "n4" },
        { label: "-5(Hundred Thousands)", value: "n5" },
        { label: "-7(Ten Millions)", value: "n7" },
        { label: "-8(Hundred Millions)", value: "n8" },
        { label: "-------------", value: "" },
        { label: "1 (Tenths)", value: "p1" },
        { label: "2 (Hundredths)", value: "p2" },
        { label: "3 (Thousandths)", value: "p3" },
        { label: "4 (Ten Thousandths)", value: "p4" },
        { label: "5 (Hundred Thousandths)", value: "p5" },
        { label: "6 (Millionths)", value: "p6" },
        { label: "7 (Ten Millionths)", value: "p7" },
        { label: "8 (Hundred Millionths)", value: "p8" },
        { label: "9 (Billionths)", value: "p9" },
      ]
    : ty === "Preset"
    ? [
        { label: "Percent/Ratio/Interest", value: "Percent/Ratio/Interest" },
        { label: "Months", value: "Months" },
        { label: "Years", value: "Years" },
        // { label: "Percent/Ratio/Interest", value: "Percent/Ratio/Interest" },
        // { label: "Months", value: "Months" },
        // { label: "Years", value: "Years" },
      ]
    : ty === "Default For"
    ? [
        { label: "(Not default)", value: "" },
        { label: "Monetary", value: "Monetary" },
        { label: "Shares", value: "Shares" },
        { label: "Money Per Share", value: "Money Per Share" },
        { label: "Ratio", value: "Ratio" },
        { label: "Integer", value: "Integer" },
        { label: "Decimal", value: "Decimal" },
        { label: "Per Unit", value: "Per Unit" },
        { label: "Area", value: "Area" },
        { label: "Volume", value: "Volume" },
        { label: "Mass", value: "Mass" },
        { label: "Weight", value: "Weight" },
        { label: "Energy", value: "Energy" },
        { label: "Power", value: "Power" },
        { label: "Length", value: "Length" },
        { label: "Memory", value: "Memory" },
        { label: "Fraction", value: "Fraction" },
      ]
    : ["Numerator", "Denominator"].includes(ty)
    ? [
        {
          label: "",
          options: [
            { label: "Shares", value: "Shares" },
            { label: "Pure", value: "Pure" },
            { label: "CAD Canadian dollar (C$)", value: "CAD Canadian dollar (C$)" },
            { label: "CNY Chinese yuan (¥)", value: "CNY Chinese yuan (¥)" },
            { label: "EUR Euro (€)", value: "EUR Euro (€)" },
            { label: "GBP Pound sterling (£)", value: "GBP Pound sterling (£)" },
            { label: "JPY Japanese yen (¥)", value: "JPY Japanese yen (¥)" },
            { label: "USD United States dollar ($)", value: "USD United States dollar ($)" },
          ],
        },
        { label: "---Recommended Units (UTR)", options: [] },
        {
          label: "---Time",
          options: [
            { label: "Y Year", value: "Y Year" },
            { label: "M Month", value: "M Month" },
            { label: "D Day", value: "D Day" },
            { label: "H Hour", value: "H Hour" },
            { label: "MM Minute", value: "MM Minute" },
            { label: "S Second", value: "S Second" },
          ],
        },
        {
          label: "---Area",
          options: [
            { label: "acre Acre", value: "acre Acre" },
            { label: "ha Hectare", value: "ha Hectare" },
            { label: "sqft Square Foot", value: "sqft Square Foot" },
            { label: "sqmi Square Mile", value: "sqmi Square Mile" },
            { label: "sqm Square Metre", value: "sqm Square Metre" },
            { label: "sqkm Square Kilometre", value: "sqkm Square Kilometre" },
          ],
        },
        {
          label: "---Energy",
          options: [
            { label: "Boe Barrel of Oil Equivalent", value: "Boe Barrel of Oil Equivalent" },
            { label: "Btu British Thermal Unit", value: "Btu British Thermal Unit" },
            { label: "ft_lb Foot-Pound", value: "ft_lb Foot-Pound" },
            {
              label: "MBoe Thousand Barrels of Oil Equivalent",
              value: "MBoe Thousand Barrels of Oil Equivalent",
            },
            {
              label: "Mcfe Thousand Cubic Foot Equivalent",
              value: "Mcfe Thousand Cubic Foot Equivalent",
            },
            {
              label: "MMBoe Millions of Barrel of Oil Equivalent",
              value: "MMBoe Millions of Barrel of Oil Equivalent",
            },
            { label: "MMBTU Millions of BTU", value: "MMBTU Millions of BTU" },
            { label: "Cal Calorie", value: "Cal Calorie" },
            { label: "J Joule", value: "J Joule" },
            { label: "kJ Kilojoule", value: "kJ Kilojoule" },
            { label: "kWh Kilowatt-Hours", value: "kWh Kilowatt-Hours" },
            { label: "mJ Millijoules", value: "mJ Millijoules" },
            { label: "MWh Megawatt-Hour", value: "MWh Megawatt-Hour" },
          ],
        },
        {
          label: "---Length",
          options: [
            { label: "ft Foot", value: "ft Foot" },
            { label: "in Inch", value: "in Inch" },
            { label: "mi Mile", value: "mi Mile" },
            { label: "nmi Nautical Mile", value: "nmi Nautical Mile" },
            { label: "yd Yard", value: "yd Yard" },
            { label: "m Metre", value: "m Metre" },
            { label: "cm Centimetre", value: "cm Centimetre" },
            { label: "dm Decimetre", value: "dm Decimetre" },
            { label: "km Kilometre", value: "km Kilometre" },
            { label: "mm Millimetre", value: "mm Millimetre" },
          ],
        },
        {
          label: "---Mass",
          options: [
            { label: "lb Pound", value: "lb Pound" },
            { label: "oz Ounce", value: "oz Ounce" },
            { label: "ozt Troy Ounce", value: "ozt Troy Ounce" },
            { label: "T Ton", value: "T Ton" },
            { label: "t Tonne", value: "t Tonne" },
            { label: "g Gram", value: "g Gram" },
            { label: "kg Kilogram", value: "kg Kilogram" },
            { label: "Mg Metric Ton", value: "Mg Metric Ton" },
          ],
        },
        {
          label: "---Volume",
          options: [
            { label: "bbl Barrel", value: "bbl Barrel" },
            { label: "ft3 Cubic Foot", value: "ft3 Cubic Foot" },
            { label: "gal Gallon", value: "gal Gallon" },
            { label: "MBbls Thousand Barrels", value: "MBbls Thousand Barrels" },
            { label: "Mcf Thousands Cubic Feet", value: "Mcf Thousands Cubic Feet" },
            { label: "MMBbls Million Barrels", value: "MMBbls Million Barrels" },
            { label: "MMcf Millions Cubic Feet", value: "MMcf Millions Cubic Feet" },
            { label: "l Litre", value: "l Litre" },
            { label: "m3 Cubic Metre", value: "m3 Cubic Metre" },
            { label: "bu Bushel", value: "bu Bushel" },
          ],
        },
        {
          label: "---Power",
          options: [
            { label: "hp Horsepower", value: "hp Horsepower" },
            { label: "W Watt", value: "W Watt" },
            { label: "kW Kilowatt", value: "kW Kilowatt" },
            { label: "MW Megawatt", value: "MW Megawatt" },
            { label: "GW Gigawatt", value: "GW Gigawatt" },
            { label: "TW Terawatt", value: "TW Terawatt" },
          ],
        },
        {
          label: "---Memory",
          options: [
            { label: "B Byte", value: "B Byte" },
            { label: "kB Kilobyte", value: "kB Kilobyte" },
            { label: "MB Megabyte", value: "MB Megabyte" },
            { label: "GB Gigabyte", value: "GB Gigabyte" },
            { label: "TB Terabyte", value: "TB Terabyte" },
          ],
        },
        {
          label: "---Other",
          options: [
            { label: "A Ampere", value: "A Ampere" },
            { label: "V Volt", value: "V Volt" },
            { label: "kV Kilovolt", value: "kV Kilovolt" },
            { label: "Hz Hertz", value: "Hz Hertz" },
          ],
        },
      ]
    : ["Presentation Table Type"].includes(ty)
    ? [
        { label: "Not Set", value: "" },
        { label: "Document and Entity Information", value: "101" },
        { label: "Statement - Balance Sheet", value: "111" },
        { label: "Statement - Cash Flows", value: "112" },
        { label: "Statement - Operations", value: "113" },
        { label: "Statement - Changes in Equity", value: "114" },
        { label: "Parenthetical - Balance Sheet", value: "121" },
        { label: "Parenthetical - Cash Flows", value: "122" },
        { label: "Parenthetical - Operations", value: "123" },
        { label: "Parenthetical - Changes in Equity", value: "124" },
        { label: "Disclosure - Accounting Policy", value: "131" },
        { label: "Disclosure - Text", value: "132" },
        { label: "Disclosure - Table", value: "133" },
        { label: "Disclosure - Detail", value: "134" },
        { label: "Disclosure - Narrative", value: "135" },
      ]
    : [];
};

export function identifierOptions(editorInstance, selectedValues) {
  if (!selectedValues.id) return [];
  let options = [];

  const element = editorInstance.dom.select(`[id="${selectedValues.id}"]`);
  let selectedNode: any = null;
  if (element.length > 0) selectedNode = element[0];
  if (!selectedNode) return [];
  let node = selectedNode;
  let parentNode = selectedNode;

  while (parentNode && parentNode.nodeName !== "BODY") {
    if (parentNode.nodeName === "TABLE") {
      node = parentNode;
      break;
    }
    parentNode = parentNode.parentNode;
  }
  if (node.nodeName !== "TABLE") return [];

  const cells = node.querySelectorAll("tr");

  cells.forEach((cell) => {
    const id = cell.getAttribute("id");
    if (id) {
      const tempXbrl = { ...parseId(id) };
      if (tempXbrl.Calculation.length > 0) {
        tempXbrl.Calculation.map((e) => {
          const identifier = e.slice(1);
          if (!options.includes(identifier)) options.push({ label: identifier, value: identifier });
        });
      }
    }
  });

  return options;
}
