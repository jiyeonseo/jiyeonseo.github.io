(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{496:function(a,t,s){"use strict";s.r(t);var n=s(5),e=Object(n.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"bashrc-tips"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#bashrc-tips"}},[a._v("#")]),a._v(" .bashrc tips")]),a._v(" "),t("p",[a._v("사실 나는 "),t("a",{attrs:{href:"https://ohmyz.sh/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Oh My Zsh"),t("OutboundLink")],1),a._v("을 써서 주로 "),t("code",[a._v("~/.zshrc")]),a._v(" 를 쓰지만, 더 일반적인 경우에도 쓸 수 있음으로 제목은 "),t("code",[a._v("~/.bashrc")]),a._v("로. 자기가 원하는 곳에 잘 넣어주기만 하면 된다.")]),a._v(" "),t("h2",{attrs:{id:"터미널에서-지금-경로-vs-code로-바로-열기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#터미널에서-지금-경로-vs-code로-바로-열기"}},[a._v("#")]),a._v(" 터미널에서 지금 경로 VS Code로 바로 열기")]),a._v(" "),t("p",[a._v("설정 방법")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# .bashrc or .zshrc")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function-name function"}},[a._v("code")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("VSCODE_CWD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),t("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PWD")]),a._v('"')]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("open")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-n")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-b")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"com.microsoft.VSCode"')]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--args")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[a._v("사용 방법")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("$ code my-project-path\n")])])]),t("h2",{attrs:{id:"python-virtualenv-사용하는-프로젝트-들어갈-때-자동으로-activate-시키기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#python-virtualenv-사용하는-프로젝트-들어갈-때-자동으로-activate-시키기"}},[a._v("#")]),a._v(" python virtualenv 사용하는 프로젝트 들어갈 때 자동으로 activate 시키기")]),a._v(" "),t("p",[a._v("설정 방법")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function-name function"}},[a._v("cd")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" ./venv "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n    deactivate\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("builtin")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$1")]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" ./venv "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v(" ./venv/bin/activate\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[a._v("사용방법")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" my-project-path\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);