(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{462:function(a,t,n){"use strict";n.r(t);var s=n(5),e=Object(s.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"beginning-scala-programming-10-loops"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#beginning-scala-programming-10-loops"}},[a._v("#")]),a._v(" [beginning-scala-programming] 10. Loops")]),a._v(" "),t("ul",[t("li",[a._v("in Java")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("var")]),a._v(" i"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("while")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("i"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n   "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("i"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n   i "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("ul",[t("li",[a._v("in Scala")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("\n "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("i"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" until "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n   "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("i"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n val a "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Array")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("fill")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("math"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("random"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("x "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n\n")])])]),t("ul",[t("li",[a._v("to 와 until의 차이점")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("scala> 1 to 5\nres1: scala.collection.immutable.Range.Inclusive = Range(1, 2, 3, 4, 5)\n\nscala> 0 until 5\nres2: scala.collection.immutable.Range = Range(0, 1, 2, 3, 4)\n")])])]),t("h2",{attrs:{id:"yield"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#yield"}},[a._v("#")]),a._v(" yield")]),a._v(" "),t("ul",[t("li",[a._v("Unit 이 아니라 Seq 를 return해 준다.")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v(" for(x <- a) yield x*x\n a.map(x => x*x) // same\n // Array[Double] = Array(0.22942607856489816, 0.42670896833696664, 0.2115497274377164, 0.4793313932180108, 0.0640459561805972)\n\n for(i <- 0 until 5; j<- 5 until 10) yield (i,j)\n //scala.collection.immutable.IndexedSeq[(Int, Int)] = Vector((0,5), (0,6), (0,7), (0,8), (0,9), (1,5), (1,6), (1,7), (1,8), (1,9), (2,5), (2,6), (2,7), (2,8), (2,9), (3,5), (3,6), (3,7), (3,8), (3,9), (4,5), (4,6), (4,7), (4,8), (4,9))\n\n")])])]),t("ul",[t("li",[a._v("for 문 안에서 다양한 연산 및 if문 사용 가능")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v(" for(i <- 0 until 5; a = 2*i; j<- 5 until 10) yield (a,j)\n // for 문 안에서도 연산 가능\n\n for(i <- 0 until 5; if i%2==0; j<- 5 until 10) yield (a,j)\n // for 문 안에서도 filter도 가능\n\n\n // {}로 바꾸면 ;(세미콜론) 생략 가능\n for { i <- 0 until 5\n     if i%2 ==0\n     a = 2 * i\n     j <- 5 until 10 } yield (a,j)\n\n\n // parallel 하게도 가능\n for { i <- (0 until 5).par\n       if i%2 ==0\n       a = 2 * i\n       j <- 5 until 10 } yield (a,j)\n // scala.collection.parallel.immutable.ParSeq[(Int, Int)] = ParVector((0,5), (0,6), (0,7), (0,8), (0,9), (4,5), (4,6), (4,7), (4,8), (4,9), (8,5), (8,6), (8,7), (8,8), (8,9))\n // return 값도 scala.collection.parallel.immutable.ParSeq 로 변함.\n\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);