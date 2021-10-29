export function CssString(str: string) {
    const css_json = `{"${str
      .replace(/; /g, '", "')
      .replace(/: /g, '": "')
      .replace(";", "")}"}`;
  
    const obj = JSON.parse(css_json);
  
    const keyValues = Object.keys(obj).map((key) => {
      var camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
      return { [camelCased]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}
