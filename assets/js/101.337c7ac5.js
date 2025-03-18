(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{516:function(t,s,a){"use strict";a.r(s);var e=a(5),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"peewee-jsonfield-업데이트-시-주의할-점"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#peewee-jsonfield-업데이트-시-주의할-점"}},[t._v("#")]),t._v(" peewee JSONField 업데이트 시 주의할 점")]),t._v(" "),s("p",[t._v("peewee에서 제공하는 옵션중 "),s("code",[t._v("only_save_dirty")]),t._v(" 가 있다.\n"),s("a",{attrs:{href:"http://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=save#model-options-and-table-metadata",target:"_blank",rel:"noopener noreferrer"}},[s("code",[t._v(".save()")]),t._v(" 호출 시에, 변경된 필드에 대해서만 save 하는 설정이다. "),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("옵션 설정은 다음과 같이 "),s("code",[t._v("Meta")]),t._v(" 클래스에 설정할 수 있다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" peewee "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n\ncontacts_db "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" SqliteDatabase"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'contacts.db'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CharField"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tjob "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" CharField"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\textra "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" JSONField"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Meta")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        database "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" contacts_db\n\t\tonly_save_dirty "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),t._v("\n")])])]),s("p",[t._v("혹은 저장시에 아래와 같이 조건으로 넘겨 줄 수도 있다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("only"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("model"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("dirty_fields"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("Model에서 설정하고 instance 내 필드를 변경하여 저장 하게되면 변경된 필드만 업데이트 된다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("person "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Person"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Wanda"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" job"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"engineer"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("job "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hero"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 이렇게 변경된 것을 dirty 되었다고 한다. ")]),t._v("\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# UPDATE Person SET job="hero" ... ')]),t._v("\n")])])]),s("p",[t._v("여기서 한가지 주의할 점이 있다.")]),t._v(" "),s("p",[s("strong",[t._v("변경할 필드가 JSON 타입인 경우 내부 값만 변경해주면 "),s("code",[t._v("dirty_fields")]),t._v(" 라고 취급하지 않아 업데이트할 필드로 들어가지 않는다.")])]),t._v(" "),s("p",[t._v("즉, 다음과 같은 경우는 변경값이 없다고 본다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[t._v("person "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Person"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Wanda"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" job"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"engineer"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" extra"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"power"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("extra"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"power"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v(" \nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("save"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# update nothing ")]),t._v("\nperson"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("is_dirty"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# False")]),t._v("\n")])])]),s("p",[t._v("왜 그런가 하고 코드를 살펴보니, "),s("code",[t._v("only_save_dirty")]),t._v(" 인 경우 "),s("code",[t._v("self.dirty_fields")]),t._v(" 로 업데이트 할 필드들을 가지고 오는데,")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# peewee.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" force_insert"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" only"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("elif")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_meta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("only_save_dirty "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("and")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" force_insert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n       field_dict "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_prune_fields"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("field_dict"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("dirty_fields"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" field_dict"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_dirty"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clear"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),t._v("\n")])])]),s("p",[t._v("("),s("a",{attrs:{href:"https://github.com/coleifer/peewee/blob/master/peewee.py#L6601-L6605",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/coleifer/peewee/blob/master/peewee.py#L6601-L6605"),s("OutboundLink")],1),t._v(")")]),t._v(" "),s("p",[t._v("이 "),s("code",[t._v("self.dirty_field")]),t._v("는  "),s("code",[t._v("self._dirty")]),t._v(" 의 값에서 가져오는 것이고,")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# peewee.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token decorator annotation punctuation"}},[t._v("@property")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dirty_fields")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("f "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" f "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_meta"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sorted_fields "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" f"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_dirty"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("("),s("a",{attrs:{href:"https://github.com/coleifer/peewee/blob/master/peewee.py#L6638-L6640",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/coleifer/peewee/blob/master/peewee.py#L6638-L6640"),s("OutboundLink")],1),t._v(")")]),t._v(" "),s("p",[t._v("이 값이 추가 되는 곳은 Field class의 "),s("code",[t._v("__set__")]),t._v(" 에서 추가 되고 있다.")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# peewee.py")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FieldAccessor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("__set__")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" instance"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n        instance"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_dirty"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("("),s("a",{attrs:{href:"https://github.com/coleifer/peewee/blob/master/peewee.py#L4446-L4448",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/coleifer/peewee/blob/master/peewee.py#L4446-L4448"),s("OutboundLink")],1),t._v(")")]),t._v(" "),s("p",[s("strong",[t._v("즉, field에 직접 set 한 경우에만 수정된 필드라고 취급한다.")])]),t._v(" "),s("p",[t._v("위 코드들을 읽어가며 왜 안되는건지 확인했고, 요게 버그인가, PR 날려야 하나 생각하고 있었는데...")]),t._v(" "),s("p",[t._v("이 글 정리하다가 문서에 이미 warning으로 쓰여져 있는 걸 확인 했다.")]),t._v(" "),s("blockquote",[s("p",[t._v("Peewee determines whether a field is “dirty” by observing when the field attribute is set on a model instance. If the field contains a value that is mutable, such as a dictionary instance, and that dictionary is then modified, Peewee will not notice the change.")])]),t._v(" "),s("p",[t._v("("),s("a",{attrs:{href:"https://docs.peewee-orm.com/en/latest/peewee/api.html?highlight=dirty#Model.dirty_fields",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.peewee-orm.com/en/latest/peewee/api.html?highlight=dirty#Model.dirty_fields"),s("OutboundLink")],1),t._v(")")]),t._v(" "),s("h3",{attrs:{id:"결론"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#결론"}},[t._v("#")]),t._v(" 결론")]),t._v(" "),s("p",[t._v("문서를 잘 읽자.")])])}),[],!1,null,null,null);s.default=n.exports}}]);