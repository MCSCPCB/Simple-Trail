export const styles=`
#panel_trail_structure,#panel_trail_properties {overflow-y:auto;overflow-x:hidden;min-height:0;}
#panel_trail_structure>.panel_vue_wrapper,#panel_trail_properties>.panel_vue_wrapper {flex:0 0 auto;overflow:visible;}
.st-structure {padding:0 0 6px;}
.st-tree {list-style:none;margin:0;padding:2px 0;}
.st-row {display:flex;align-items:center;gap:4px;min-height:28px;padding:0 6px;cursor:pointer;color:var(--color-text);}
.st-row:hover {background:var(--color-button);}
.st-row.selected {background:var(--color-selected);}
.st-empty-state {padding:12px;display:flex;flex-direction:column;gap:8px;color:var(--color-subtle_text);white-space:normal;}
.st-properties {padding:4px 10px 10px;}
.st-properties section {margin:10px 0;padding-top:6px;border-top:1px solid var(--color-border);}
.st-properties h4 {margin:0 0 4px;font-size:1em;color:var(--color-subtle_text);font-weight:normal;}
.st-heading {margin:4px 6px 8px;font-size:1.1em;font-weight:normal;overflow-wrap:anywhere;}
.st-field {display:grid;grid-template-columns:minmax(70px,42%) minmax(0,1fr);align-items:center;gap:8px;margin:5px 0;min-height:24px;}
.st-field>.bb-select {min-width:0;width:100%;height:24px;line-height:24px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.st-vector {margin:8px 0;}
.st-vector-label {display:flex;align-items:center;gap:6px;margin-bottom:2px;color:var(--color-subtle_text);}
.st-vector>div:last-child {display:flex;gap:4px;}
.st-tag {font-size:.85em;padding:0 5px;border-radius:3px;background:var(--color-back);}
.st-reset {margin-left:auto;font-size:16px;cursor:pointer;}
.st-reset:hover {color:var(--color-light);}
.st-number-input {display:flex;flex:1;min-width:0;}
.st-number-input .nslide_tool {width:100%;min-width:0;margin:0;height:24px;}
.st-number-input .nslide {width:100%;min-width:0;height:24px;line-height:24px;text-align:center;}
.st-expression {display:block;margin:6px 0;}
.st-expression input {display:block;width:100%;margin-top:3px;}
.st-note {margin:4px 0;color:var(--color-subtle_text);white-space:normal;font-size:.92em;}
.st-error {margin:6px 8px;color:var(--color-error);white-space:normal;}
.st-buttons {display:flex;flex-wrap:wrap;gap:4px;margin:10px 6px 0;}
.st-check-row {display:flex;align-items:center;gap:6px;margin:3px 0;cursor:pointer;}
.st-properties details summary {cursor:pointer;color:var(--color-subtle_text);margin:6px 0 2px;}
.st-grow {flex:1;min-width:0;overflow-wrap:anywhere;}
.st-ellipsis {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.st-browser {display:flex;flex-direction:column;gap:6px;}
.st-browser-bar {display:flex;align-items:center;gap:6px;}
.st-entity-list {list-style:none;margin:0;padding:0;max-height:48vh;min-height:120px;overflow:auto;border:1px solid var(--color-border);background:var(--color-back);}
.st-entity-list li {display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:default;}
.st-entity-list li:hover {background:var(--color-button);}
.st-entity-list li.selected {background:var(--color-selected);}
.st-entity-list li.st-unavailable {opacity:.55;}
`;
