var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => HtmlTagsAutocomplete
});
var import_obsidian2 = __toModule(require("obsidian"));

// src/editor_suggest.ts
var import_obsidian = __toModule(require("obsidian"));

// src/common.ts
function cursorTag(cursor, editor, include_start = false) {
  const valid_tag_pattern = new RegExp(/<(\/?)([\w|\d|\-]+)>/);
  const line = editor.getLine(cursor.line);
  let line_split;
  if (include_start) {
    line_split = line[cursor.ch] === "<" ? cursor.ch + 1 : cursor.ch - 1;
  } else {
    line_split = line[cursor.ch - 1] === "<" ? cursor.ch : cursor.ch - 1;
  }
  const start_index = line.lastIndexOf("<", line_split);
  const end_index = line.indexOf(">", line_split);
  const tag_match = valid_tag_pattern.exec(line.slice(start_index, end_index + 1));
  if (!tag_match) {
    return null;
  }
  if (start_index + tag_match.index + tag_match[0].length <= line_split) {
    return null;
  }
  tag_match.index += start_index;
  tag_match.input = line;
  return tag_match;
}
function matchingTag(cursor_tag) {
  let start, end, pair_tag_pattern;
  if (isOpeningTag(cursor_tag)) {
    start = cursor_tag.index + cursor_tag[0].length + 1;
    end = void 0;
    pair_tag_pattern = new RegExp(`<\\/${cursor_tag[2]}>`);
  } else {
    start = 0;
    end = cursor_tag.index;
    pair_tag_pattern = new RegExp(`<${cursor_tag[2]}>`);
  }
  const pair_match = pair_tag_pattern.exec(cursor_tag.input.slice(start, end));
  if (!pair_match) {
    return null;
  }
  pair_match.input = cursor_tag.input;
  pair_match.index += start;
  return pair_match;
}
function isOpeningTag(tag_match) {
  return !tag_match[1];
}

// src/editor_suggest.ts
var HtmlTagsAutocompleteSuggestor = class extends import_obsidian.EditorSuggest {
  constructor(app) {
    super(app);
  }
  onTrigger(cursor, editor, file) {
    if (cursor.ch === 0) {
      return null;
    }
    const cursor_tag = cursorTag(cursor, editor);
    if (!cursor_tag) {
      return null;
    }
    const pair_tag = matchingTag(cursor_tag);
    if (!pair_tag && isOpeningTag(cursor_tag)) {
      return {
        start: { line: cursor.line, ch: cursor_tag.index },
        end: { line: cursor.line, ch: cursor_tag.index + cursor_tag[0].length },
        query: `</${cursor_tag[2]}>`
      };
    } else if (!pair_tag && isOpeningTag(cursor_tag)) {
      return null;
    } else if (isOpeningTag(cursor_tag)) {
      const match_pos = cursor_tag.index + cursor_tag[0].length + pair_tag.index;
      return {
        start: { line: cursor.line, ch: match_pos },
        end: { line: cursor.line, ch: match_pos + pair_tag[0].length },
        query: `</${cursor_tag[2]}>`
      };
    } else {
      return null;
    }
    return null;
  }
  getSuggestions(context) {
    return [context.query];
  }
  renderSuggestion(value, el) {
    el.setText(value);
  }
  selectSuggestion(value, event) {
    const editor = this.context.editor;
    const cursor = editor.getCursor();
    const cursor_tag = cursorTag(cursor, editor);
    if (!cursor_tag) {
      return false;
    }
    const insert_pos = {
      line: cursor.line,
      ch: cursor_tag.index + cursor_tag[0].length
    };
    editor.replaceRange(value, insert_pos);
    editor.setSelection(insert_pos);
  }
};

// src/commands.ts
var canSkipOverTag = (checking, editor, forward) => {
  const cursor = editor.getCursor();
  const cursor_tag = cursorTag(cursor, editor, forward);
  if (!cursor_tag) {
    return false;
  }
  if (checking) {
    if (forward) {
      return cursor.ch < cursor_tag.index + cursor_tag[0].length;
    }
    return cursor_tag.index <= cursor.ch;
  }
  return skipOverTag(cursor, editor, cursor_tag, forward);
};
var canSkipOverTagForward = (checking, editor, view) => {
  return canSkipOverTag(checking, editor, true);
};
var canSkipOverTagBackward = (checking, editor, view) => {
  return canSkipOverTag(checking, editor, false);
};
var skipOverTag = (cursor, editor, cursor_tag, forward = true) => {
  const ch = forward ? cursor_tag.index + cursor_tag[0].length : cursor_tag.index;
  editor.setCursor({ line: cursor.line, ch });
  return true;
};
var skip_over_tag_forward = {
  id: "html_autocomplete_tags-skip_over_tag_forward",
  name: "Skip over tag forward",
  editorCheckCallback: canSkipOverTagForward,
  hotKeys: [
    { modifiers: ["Ctrl", "Shift"], key: 39 }
  ]
};
var skip_over_tag_backward = {
  id: "html_autocomplete_tags-skip_over_tag_backward",
  name: "Skip over tag backward",
  editorCheckCallback: canSkipOverTagBackward,
  hotKeys: [
    { modifiers: ["Ctrl", "Shift"], key: 37 }
  ]
};
var canGoToMatchingTag = (checking, editor, view) => {
  const cursor = editor.getCursor();
  const cursor_tag = cursorTag(cursor, editor, true);
  if (!cursor_tag) {
    return false;
  }
  const pair_tag = matchingTag(cursor_tag);
  if (!pair_tag) {
    return false;
  }
  if (checking) {
    return true;
  }
  let ch = pair_tag.index;
  if (cursor_tag.index > pair_tag.index) {
    ch += pair_tag[0].length;
  }
  editor.setCursor({ line: cursor.line, ch });
};
var to_matching_tag = {
  id: "html_autocomplete_tags-to_matching_tag",
  name: "To matching tag",
  editorCheckCallback: canGoToMatchingTag,
  hotKeys: [
    { modifiers: ["Ctrl"], key: "m" }
  ]
};

// src/main.ts
var HtmlTagsAutocomplete = class extends import_obsidian2.Plugin {
  onload() {
    return __async(this, null, function* () {
      this.registerEditorSuggest(new HtmlTagsAutocompleteSuggestor(this.app));
      this.addCommand(skip_over_tag_forward);
      this.addCommand(skip_over_tag_backward);
      this.addCommand(to_matching_tag);
    });
  }
  onunload() {
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2VkaXRvcl9zdWdnZXN0LnRzIiwgInNyYy9jb21tb24udHMiLCAic3JjL2NvbW1hbmRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdFBsdWdpbixcclxufSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5pbXBvcnQgRWRpdG9yU3VnZ2VzdG9yIGZyb20gJy4vZWRpdG9yX3N1Z2dlc3QnO1xyXG5pbXBvcnQgKiBhcyBjb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sVGFnc0F1dG9jb21wbGV0ZSBleHRlbmRzIFBsdWdpbiB7XHJcblxyXG5cdGFzeW5jIG9ubG9hZCgpIHtcclxuXHRcdHRoaXMucmVnaXN0ZXJFZGl0b3JTdWdnZXN0KCBuZXcgRWRpdG9yU3VnZ2VzdG9yKCB0aGlzLmFwcCApICk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoIGNvbW1hbmRzLnNraXBfb3Zlcl90YWdfZm9yd2FyZCApO1xyXG5cdFx0dGhpcy5hZGRDb21tYW5kKCBjb21tYW5kcy5za2lwX292ZXJfdGFnX2JhY2t3YXJkICk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoIGNvbW1hbmRzLnRvX21hdGNoaW5nX3RhZyApO1xyXG5cdH1cclxuXHJcblx0b251bmxvYWQoKSB7XHJcblx0fVxyXG59IiwgImltcG9ydCB7XHJcblx0QXBwLFxyXG5cdFRGaWxlLFxyXG5cdEVkaXRvcixcclxuXHRFZGl0b3JQb3NpdGlvbixcclxuXHRFZGl0b3JTdWdnZXN0LFxyXG5cdEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyxcclxuXHRFZGl0b3JTdWdnZXN0Q29udGV4dFxyXG59IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmltcG9ydCB7XHJcblx0Y3Vyc29yVGFnLFxyXG5cdG1hdGNoaW5nVGFnLFxyXG5cdGlzT3BlbmluZ1RhZ1xyXG59IGZyb20gJy4vY29tbW9uJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sVGFnc0F1dG9jb21wbGV0ZVN1Z2dlc3RvciBleHRlbmRzIEVkaXRvclN1Z2dlc3Q8c3RyaW5nPiB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBhcHA6IEFwcCApIHtcclxuXHRcdHN1cGVyKCBhcHAgKTtcclxuXHR9XHJcblxyXG5cdG9uVHJpZ2dlciggY3Vyc29yOiBFZGl0b3JQb3NpdGlvbiwgZWRpdG9yOiBFZGl0b3IsIGZpbGU6IFRGaWxlICk6IEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyB8IG51bGwge1xyXG5cdFx0aWYgKCBjdXJzb3IuY2ggPT09IDAgKSB7XHJcblx0XHRcdC8vIGF0IGJlZ2lubmluZyBvZiBsaW5lLFxyXG5cdFx0XHQvLyBjYW4ndCBiZSBpbiBhIHRhZ1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBjdXJzb3JfdGFnID0gY3Vyc29yVGFnKCBjdXJzb3IsIGVkaXRvciApO1xyXG5cdFx0aWYgKCAhY3Vyc29yX3RhZyApIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgcGFpcl90YWcgPSBtYXRjaGluZ1RhZyggY3Vyc29yX3RhZyApO1xyXG5cdFx0aWYgKCAhcGFpcl90YWcgJiYgaXNPcGVuaW5nVGFnKCBjdXJzb3JfdGFnICkgKSB7XHJcblx0XHRcdC8vIG9wZW5pbmcgdGFnIHdpdGhvdXQgbWF0Y2hpbmcgY2xvc2VcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzdGFydDogeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IGN1cnNvcl90YWcuaW5kZXggfSxcclxuXHRcdFx0XHRlbmQ6IHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjdXJzb3JfdGFnLmluZGV4ICsgY3Vyc29yX3RhZ1sgMCBdLmxlbmd0aCB9LFxyXG5cdFx0XHRcdHF1ZXJ5OiBgPC8ke2N1cnNvcl90YWdbIDIgXX0+YFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoICFwYWlyX3RhZyAmJiBpc09wZW5pbmdUYWcoIGN1cnNvcl90YWcgKSApIHtcclxuXHRcdFx0Ly8gY2xvc2luZyB0YWcgd2l0aG91dCBvcGVuaW5nXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIGlzT3BlbmluZ1RhZyggY3Vyc29yX3RhZyApICkge1xyXG5cdFx0XHQvLyBvcGVuaW5nIHRhZyB3aXRoIG1hdGNoaW5nIGNsb3NlIGFscmVhZHlcclxuXHRcdFx0Y29uc3QgbWF0Y2hfcG9zID0gY3Vyc29yX3RhZy5pbmRleCArIGN1cnNvcl90YWdbIDAgXS5sZW5ndGggKyBwYWlyX3RhZy5pbmRleDtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzdGFydDogeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IG1hdGNoX3BvcyB9LFxyXG5cdFx0XHRcdGVuZDogeyBsaW5lOiBjdXJzb3IubGluZSwgY2g6IG1hdGNoX3BvcyArIHBhaXJfdGFnWyAwIF0ubGVuZ3RoIH0sXHJcblx0XHRcdFx0cXVlcnk6IGA8LyR7Y3Vyc29yX3RhZ1sgMiBdfT5gXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gY2xvc2luZyB0YWcgd2l0aCBtYXRjaGluZyBvcGVuIGFscmVhZHlcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXJyb3IsIGRlZmF1bHQgdG8gbm90aGluZ1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRTdWdnZXN0aW9ucyggY29udGV4dDogRWRpdG9yU3VnZ2VzdENvbnRleHQgKTogc3RyaW5nW10gfCBQcm9taXNlPHN0cmluZ1tdPiB7XHJcblx0XHRyZXR1cm4gWyBjb250ZXh0LnF1ZXJ5IF07XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTdWdnZXN0aW9uKCB2YWx1ZTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQgKSB7XHJcblx0XHRlbC5zZXRUZXh0KCB2YWx1ZSApO1xyXG5cdH1cclxuXHJcblx0c2VsZWN0U3VnZ2VzdGlvbiggdmFsdWU6IHN0cmluZywgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50ICkge1xyXG5cdFx0Y29uc3QgZWRpdG9yID0gdGhpcy5jb250ZXh0LmVkaXRvcjtcclxuXHRcdGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGNvbnN0IGN1cnNvcl90YWcgPSBjdXJzb3JUYWcoIGN1cnNvciwgZWRpdG9yICk7XHJcblx0XHRpZiAoICFjdXJzb3JfdGFnICkge1xyXG5cdFx0XHQvLyBlcnJvclxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgaW5zZXJ0X3BvcyA9IHtcclxuXHRcdFx0bGluZTogY3Vyc29yLmxpbmUsXHJcblx0XHRcdGNoOiBjdXJzb3JfdGFnLmluZGV4ICsgY3Vyc29yX3RhZ1sgMCBdLmxlbmd0aFxyXG5cdFx0fTtcclxuXHJcblx0XHRlZGl0b3IucmVwbGFjZVJhbmdlKCB2YWx1ZSwgaW5zZXJ0X3BvcyApO1xyXG5cdFx0ZWRpdG9yLnNldFNlbGVjdGlvbiggaW5zZXJ0X3BvcyApOyAgLy8gcGxhY2UgY3Vyc29yIGJldHdlZW4gdGFnc1xyXG5cdH1cclxufSIsICJpbXBvcnQge1xuXHRFZGl0b3IsXG5cdEVkaXRvclBvc2l0aW9uLFxufSBmcm9tICdvYnNpZGlhbic7XG5cblxuLyoqXG4gKiBHZXRzIHRoZSB0YWcgYXNzb2NpYXRhdGVkIHdpdGggdGhlIGN1cnNvci5cbiAqIFxuICogQHBhcmFtIGluY2x1ZGVfc3RhcnQgV2hldGhlciB0byBjaGVjayBpZiB0aGUgY3Vyc29yIGlzXG4gKiBcdFx0XHRpbiBmcm9udCBvZiBhIHRhZy4gW0RlZmF1bHQ6IGZhbHNlXVxuICogQHJldHVybnMgUmVnRXhwIG1hdGNoIHJlbGF0aXZlIHRvIHRoZSBsaW5lIGlmIGFuIGFzc29jaWF0ZWQgdGFnIGlzIGZvdW5kLFxuICogXHRcdFx0b3RoZXJ3aXNlLCByZXR1cm4gbnVsbC5cbiAqIFx0XHRcdEFuIGFzc29jaWF0ZWQgdGFnIGlzIG9uZSB0aGUgY3Vyc29yIGlzIGluLCBvciBqdXN0IG91dHNpZGUgb2YgdGhlIGNsb3NpbmcgJz4nLlxuICogXHRcdFx0VGhlIFJlZ0V4cCBtYXRjaCBoYXMgdHdvIGdyb3VwczpcbiAqIFx0XHRcdFx0MS4gJy8nIGlmIHRoZSB0YWcgaXMgYSBjbG9zaW5nIHRhZywgb3RoZXJ3aXNlICcnXG4gKiBcdFx0XHRcdDIuIFRoZSBuYW1lIG9mIHRoZSB0YWcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXJzb3JUYWcoXG5cdGN1cnNvcjogRWRpdG9yUG9zaXRpb24sXG5cdGVkaXRvcjogRWRpdG9yLFxuXHRpbmNsdWRlX3N0YXJ0OiBib29sZWFuID0gZmFsc2Vcbik6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsIHtcblx0Y29uc3QgdmFsaWRfdGFnX3BhdHRlcm4gPSBuZXcgUmVnRXhwKCAvPChcXC8/KShbXFx3fFxcZHxcXC1dKyk+LyApO1xuXG5cdC8vIHNwbGl0IHRleHQgYXQgY3Vyc29yXG5cdGNvbnN0IGxpbmUgPSBlZGl0b3IuZ2V0TGluZSggY3Vyc29yLmxpbmUgKTtcblx0bGV0IGxpbmVfc3BsaXRcblx0aWYgKCBpbmNsdWRlX3N0YXJ0ICkge1xuXHRcdGxpbmVfc3BsaXQgPSAoIGxpbmVbIGN1cnNvci5jaCBdID09PSAnPCcgKSA/IGN1cnNvci5jaCArIDEgOiBjdXJzb3IuY2ggLSAxO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGxpbmVfc3BsaXQgPSAoIGxpbmVbIGN1cnNvci5jaCAtIDEgXSA9PT0gJzwnICkgPyBjdXJzb3IuY2ggOiBjdXJzb3IuY2ggLSAxO1xuXHR9XG5cdGNvbnN0IHN0YXJ0X2luZGV4ID0gbGluZS5sYXN0SW5kZXhPZiggJzwnLCBsaW5lX3NwbGl0ICk7XG5cdGNvbnN0IGVuZF9pbmRleCA9IGxpbmUuaW5kZXhPZiggJz4nLCBsaW5lX3NwbGl0ICk7XG5cblx0Y29uc3QgdGFnX21hdGNoID0gdmFsaWRfdGFnX3BhdHRlcm4uZXhlYyhcblx0XHRsaW5lLnNsaWNlKCBzdGFydF9pbmRleCwgZW5kX2luZGV4ICsgMSApXG5cdCk7XG5cblx0aWYgKCAhdGFnX21hdGNoICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGlmICggc3RhcnRfaW5kZXggKyB0YWdfbWF0Y2guaW5kZXggKyB0YWdfbWF0Y2hbIDAgXS5sZW5ndGggPD0gbGluZV9zcGxpdCApIHtcblx0XHQvLyBjdXJzb3Igb3V0c2lkZSBvZiB0YWdcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIG1vZGlmeSBtYXRjaCB0byBiZSByZWxhdGl2ZSB0byBsaW5lXG5cdHRhZ19tYXRjaC5pbmRleCArPSBzdGFydF9pbmRleDtcblx0dGFnX21hdGNoLmlucHV0ID0gbGluZTtcblxuXHRyZXR1cm4gdGFnX21hdGNoO1xufVxuXG5cbi8qKlxuICogR2V0IHRoZSBtYXRjaGluZyB0YWcgYXNzb2NpYXRlZCB0byB0aGUgZ2l2ZW4gdGFnLlxuICogXG4gKiBAcmV0dXJucyBSZWdFeHAgbWF0Y2ggcmVsYXRpdmUgdG8gdGhlIGxpbmUgaWYgYSBtYXRjaGluZyB0YWcgaXMgZm91bmQsXG4gKiBcdFx0XHRvdGhlcndpc2UsIHJldHVybiBudWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hpbmdUYWcoIGN1cnNvcl90YWc6IFJlZ0V4cE1hdGNoQXJyYXkgKTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwge1xuXHRsZXQgc3RhcnQ6IG51bWJlcixcblx0XHRlbmQ6IG51bWJlcixcblx0XHRwYWlyX3RhZ19wYXR0ZXJuOiBSZWdFeHA7XG5cblx0aWYgKCBpc09wZW5pbmdUYWcoIGN1cnNvcl90YWcgKSApIHtcblx0XHRzdGFydCA9IGN1cnNvcl90YWcuaW5kZXggKyBjdXJzb3JfdGFnWyAwIF0ubGVuZ3RoICsgMTtcblx0XHRlbmQgPSB1bmRlZmluZWQ7XG5cdFx0cGFpcl90YWdfcGF0dGVybiA9IG5ldyBSZWdFeHAoIGA8XFxcXC8ke2N1cnNvcl90YWdbIDIgXX0+YCApO1xuXHR9XHRcblx0ZWxzZSB7XG5cdFx0c3RhcnQgPSAwO1xuXHRcdGVuZCA9IGN1cnNvcl90YWcuaW5kZXg7XG5cdFx0cGFpcl90YWdfcGF0dGVybiA9IG5ldyBSZWdFeHAoIGA8JHtjdXJzb3JfdGFnWyAyIF19PmAgKTtcblx0fVxuXG5cdGNvbnN0IHBhaXJfbWF0Y2ggPSBwYWlyX3RhZ19wYXR0ZXJuLmV4ZWMoIGN1cnNvcl90YWcuaW5wdXQuc2xpY2UoIHN0YXJ0LCBlbmQgKSApO1xuXHRpZiAoICFwYWlyX21hdGNoICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gbW9kaWZ5IG1hdGNoIHRvIGJlIHJlbGF0aXZlIHRvIGxpbmVcblx0cGFpcl9tYXRjaC5pbnB1dCA9IGN1cnNvcl90YWcuaW5wdXQ7XG5cdHBhaXJfbWF0Y2guaW5kZXggKz0gc3RhcnQ7XG5cdHJldHVybiBwYWlyX21hdGNoO1xufVxuXG5cbi8qKlxuICogQ2hlY2sgaWYgZ2l2ZW4gdGFnIGlzIGFuIG9wZW5pbmcgdGFnLlxuICogXG4gKiBAcGFyYW0gdGFnTWF0Y2ggU2hvdWxkIGJlIGEgbWF0Y2ggZnJvbSAjY3Vyc29yVGFnIG9yICNtYXRjaGluZ1RhZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT3BlbmluZ1RhZyggdGFnX21hdGNoOiBSZWdFeHBNYXRjaEFycmF5ICk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gIXRhZ19tYXRjaFsgMSBdO1xufSIsICJpbXBvcnQge1xuXHRFZGl0b3IsXG5cdE1hcmtkb3duVmlld1xufSBmcm9tICdvYnNpZGlhbic7XG5cbmltcG9ydCB7XG5cdGN1cnNvclRhZyxcblx0bWF0Y2hpbmdUYWdcbn0gZnJvbSAnLi9jb21tb24nO1xuXG5cbi8qKioqKioqKioqKioqKioqKioqKipcbiAqIFNraXAgVGFnc1xuICoqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IGNhblNraXBPdmVyVGFnID0gKFxuXHRjaGVja2luZzogYm9vbGVhbixcblx0ZWRpdG9yOiBFZGl0b3IsXG5cdGZvcndhcmQ6IGJvb2xlYW5cbik6IGJvb2xlYW4gPT4ge1xuXG5cdGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcblx0Y29uc3QgY3Vyc29yX3RhZyA9IGN1cnNvclRhZyggY3Vyc29yLCBlZGl0b3IsIGZvcndhcmQgKTtcblx0aWYgKCAhY3Vyc29yX3RhZyApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiggY2hlY2tpbmcgKSB7XG5cdFx0aWYgKCBmb3J3YXJkICkge1xuXHRcdFx0cmV0dXJuICggY3Vyc29yLmNoIDwgY3Vyc29yX3RhZy5pbmRleCArIGN1cnNvcl90YWdbIDAgXS5sZW5ndGggKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKCBjdXJzb3JfdGFnLmluZGV4IDw9IGN1cnNvci5jaCApO1xuXHR9XG5cblx0cmV0dXJuIHNraXBPdmVyVGFnKCBjdXJzb3IsIGVkaXRvciwgY3Vyc29yX3RhZywgZm9yd2FyZCApO1xufTtcblxuXG5jb25zdCBjYW5Ta2lwT3ZlclRhZ0ZvcndhcmQgPSAoXG5cdGNoZWNraW5nOiBib29sZWFuLFxuXHRlZGl0b3I6IEVkaXRvcixcblx0dmlldzogTWFya2Rvd25WaWV3XG4pOiBib29sZWFuID0+IHtcblx0cmV0dXJuIGNhblNraXBPdmVyVGFnKCBjaGVja2luZywgZWRpdG9yLCB0cnVlICk7XG59O1xuXG5cbmNvbnN0IGNhblNraXBPdmVyVGFnQmFja3dhcmQgPSAoXG5cdGNoZWNraW5nOiBib29sZWFuLFxuXHRlZGl0b3I6IEVkaXRvcixcblx0dmlldzogTWFya2Rvd25WaWV3XG4pOiBib29sZWFuID0+IHtcblx0cmV0dXJuIGNhblNraXBPdmVyVGFnKCBjaGVja2luZywgZWRpdG9yLCBmYWxzZSApO1xufTtcblxuXG5jb25zdCBza2lwT3ZlclRhZyA9IChcblx0Y3Vyc29yOiBFZGl0b3JQb3NpdGlvbixcblx0ZWRpdG9yOiBFZGl0b3IsXG5cdGN1cnNvcl90YWc6IFJlZ0V4cE1hdGNoQXJyYXksXG5cdGZvcndhcmQ6IGJvb2xlYW4gPSB0cnVlXG4pOiBib29sZWFuID0+IHtcblx0Y29uc3QgY2ggPSAoXG5cdFx0Zm9yd2FyZCA/XG5cdFx0Y3Vyc29yX3RhZy5pbmRleCArIGN1cnNvcl90YWdbIDAgXS5sZW5ndGg6XG5cdFx0Y3Vyc29yX3RhZy5pbmRleFxuXHQpO1xuXG5cdGVkaXRvci5zZXRDdXJzb3IoIHsgbGluZTogY3Vyc29yLmxpbmUsIGNoOiBjaCB9ICk7XG5cdHJldHVybiB0cnVlO1xufVxuXG5cbmV4cG9ydCBjb25zdCBza2lwX292ZXJfdGFnX2ZvcndhcmQgPSB7XG5cdGlkOiAnaHRtbF9hdXRvY29tcGxldGVfdGFncy1za2lwX292ZXJfdGFnX2ZvcndhcmQnLFxuXHRuYW1lOiAnU2tpcCBvdmVyIHRhZyBmb3J3YXJkJyxcblx0ZWRpdG9yQ2hlY2tDYWxsYmFjazogY2FuU2tpcE92ZXJUYWdGb3J3YXJkLFxuXHRob3RLZXlzOiBbXG5cdFx0eyBtb2RpZmllcnM6IFsgJ0N0cmwnLCAnU2hpZnQnIF0sIGtleTogMzkgfSAgIC8vIHJpZ2h0IGFycm93XG5cdF1cbn07XG5cbmV4cG9ydCBjb25zdCBza2lwX292ZXJfdGFnX2JhY2t3YXJkID0ge1xuXHRpZDogJ2h0bWxfYXV0b2NvbXBsZXRlX3RhZ3Mtc2tpcF9vdmVyX3RhZ19iYWNrd2FyZCcsXG5cdG5hbWU6ICdTa2lwIG92ZXIgdGFnIGJhY2t3YXJkJyxcblx0ZWRpdG9yQ2hlY2tDYWxsYmFjazogY2FuU2tpcE92ZXJUYWdCYWNrd2FyZCxcblx0aG90S2V5czogW1xuXHRcdHsgbW9kaWZpZXJzOiBbICdDdHJsJywgJ1NoaWZ0JyBdLCBrZXk6IDM3IH0gIC8vIGxlZnQgYXJyb3cgXG5cdF1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKlxuICogTWF0Y2hpbmcgVGFnc1xuICoqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgY2FuR29Ub01hdGNoaW5nVGFnID0gKFxuXHRjaGVja2luZzogYm9vbGVhbixcblx0ZWRpdG9yOiBFZGl0b3IsXG5cdHZpZXc6IE1hcmtkb3duVmlld1xuKTogYm9vbGVhbiA9PiB7XG5cdGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcblx0Y29uc3QgY3Vyc29yX3RhZyA9IGN1cnNvclRhZyggY3Vyc29yLCBlZGl0b3IsIHRydWUgKTtcblx0aWYgKCAhY3Vyc29yX3RhZyApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCBwYWlyX3RhZyA9IG1hdGNoaW5nVGFnKCBjdXJzb3JfdGFnICk7XG5cdGlmICggIXBhaXJfdGFnICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmKCBjaGVja2luZyApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIGp1bXAgaW5zaWRlIG9mIHRhZ1xuXHRsZXQgY2ggPSBwYWlyX3RhZy5pbmRleDsgXG5cdGlmICggY3Vyc29yX3RhZy5pbmRleCA+IHBhaXJfdGFnLmluZGV4ICkgeyAgXG5cdFx0Ly8ganVtcGluZyBiYWNrd2FyZFx0XHRcblx0XHRjaCArPSBwYWlyX3RhZ1sgMCBdLmxlbmd0aDtcblx0fVxuXHRlZGl0b3Iuc2V0Q3Vyc29yKCB7IGxpbmU6IGN1cnNvci5saW5lLCBjaDogY2ggfSApO1xufTtcblxuXG5leHBvcnQgY29uc3QgdG9fbWF0Y2hpbmdfdGFnID0ge1xuXHRpZDogJ2h0bWxfYXV0b2NvbXBsZXRlX3RhZ3MtdG9fbWF0Y2hpbmdfdGFnJyxcblx0bmFtZTogJ1RvIG1hdGNoaW5nIHRhZycsXG5cdGVkaXRvckNoZWNrQ2FsbGJhY2s6IGNhbkdvVG9NYXRjaGluZ1RhZyxcblx0aG90S2V5czogW1xuXHRcdHsgbW9kaWZpZXJzOiBbICdDdHJsJyBdLCBrZXk6ICdtJyB9IFxuXHRdXG59OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVPOzs7QUNGUCxzQkFRTzs7O0FDVUEsbUJB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
