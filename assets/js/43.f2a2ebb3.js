(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{439:function(t,a,e){"use strict";e.r(a);var s=e(5),l=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"fp101x-week-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fp101x-week-1"}},[t._v("#")]),t._v(" FP101x - week 1")]),t._v(" "),a("p",[t._v("몇 주 전, Coursera에서 시작하는 한 코스를 등록했는데… 너무 빡쎄서 ㅠ.ㅠ  어쩌지 하고 있던 상황에서 괜찮은 코스를 알게되었다.")]),t._v(" "),a("p",[a("em",[a("a",{attrs:{href:"https://courses.edx.org/courses/course-v1:DelftX+FP101x+3T2015/info",target:"_blank"}},[t._v("FP101x Introduction to Functional Programming")])])]),t._v(" "),a("p",[t._v("edx 역시 Coursera와 같은 MOOC로 이 코스는 "),a("a",{attrs:{href:"http://www.tudelft.nl/"}},[t._v("Delft University of Technology")]),t._v(" 라는 네덜란드 대학에서 진행되는 수업이다. 사실 제목에 101 이 보여서 더 끌렸다.ㅋㅋㅋㅋ")]),t._v(" "),a("p",[t._v("그리고 요즘 대세인 Functional Programming. 제목만 보고는 왠지 스칼라로 진행 할 것 같았는데 Haskell이다. 아 당황스러웠다. 전혀 모르는데..\n다행히 첫 수업은 하스켈의 문법부터 차근차근 알려주고 이 수업을 들으면 하스켈 뿐만 아니라 자바, 스칼라 등 다른 언어에서도 functional programming을 바로 써먹을 수 있다고 약을 판.. 아니 격려해 주니 맘 놓고 시작해 볼 만 한 것 같다.")]),t._v(" "),a("p",[t._v("수업은 총 8주로 이루어져 있고 avg 60% 이상 점수를 받아야 Certificate를 받을 수 있다.\n점수는 11번의 homework와 7번의 lab assignment로 이루어진다.")]),t._v(" "),a("h2",{attrs:{id:"github-repo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-repo"}},[t._v("#")]),t._v(" Github repo")]),t._v(" "),a("p",[a("em",[a("a",{attrs:{href:"https://github.com/fptudelft/FP101x-Content-2015",target:"_blank"}},[t._v("https://github.com/fptudelft/FP101x-Content-2015")])]),t._v("\n수업 mp3, slide, transcript, exercise 들이 올라온다.")]),t._v(" "),a("h1",{attrs:{id:"week-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#week-1"}},[t._v("#")]),t._v(" Week 1")]),t._v(" "),a("ul",[a("li",[t._v("Functional Programming의 역사와 간단한 설명")]),t._v(" "),a("li",[t._v("하스켈 설치부터 간단한 문법을 알려준다.")])]),t._v(" "),a("h2",{attrs:{id:"설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#설치"}},[t._v("#")]),t._v(" 설치")]),t._v(" "),a("p",[t._v("Glasgow Haskell Compiler (GHC)\n"),a("a",{attrs:{href:"https://www.haskell.org/platform/",target:"_blank"}},[t._v("https://www.haskell.org/platform/")])]),t._v(" "),a("h2",{attrs:{id:"하스켈-문법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#하스켈-문법"}},[t._v("#")]),t._v(" 하스켈 문법")]),t._v(" "),a("ul",[a("li",[t._v("Select the first element of a list")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> head [1,2,3,4]\n1\n")])])]),a("ul",[a("li",[t._v("Remove the first element from a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> tail [1,2,3,4,5]\n[2,3,4,5]\n")])])]),a("ul",[a("li",[t._v("Select the nth element of a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> [1,2,3,4,5] !! 2\n3\n")])])]),a("ul",[a("li",[t._v("Select the first e elements of a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> take 3 [1,2,3,4,5]\n[1,2,3]\n")])])]),a("ul",[a("li",[t._v("Remove the first n elements from a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> drop 3 [1,2,3,4,5]\n[4,5]\n")])])]),a("ul",[a("li",[t._v("Calculate the length of a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> length [1,2,3,4,5]\n5\n")])])]),a("ul",[a("li",[t._v("Calculate the sum of a list of numbers :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> sum [1,2,3,4,5]\n15\n")])])]),a("ul",[a("li",[t._v("Calculate the product of a list of numbers :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> product [1,2,3,4,5]\n120\n")])])]),a("ul",[a("li",[t._v("Append two lists :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("> [1,2,3] ++ [4,5]\n[1,2,3,4,5]\n")])])]),a("ul",[a("li",[t._v("Reverse a list :")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("reverse [1,2,3,4,5]\n[5,4,3,2,1]\n")])])]),a("h2",{attrs:{id:"function-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#function-application"}},[t._v("#")]),t._v(" Function Application")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("(Mathematics) f(a,b) + c d >> (Haskell) f a b + c*d\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("f a + b\n")])])]),a("ul",[a("li",[t._v("(f a) + b 를 의미한다")]),t._v(" "),a("li",[t._v("f (a + b) 가 아니라")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Mathematics")]),t._v(" "),a("th",[t._v("Haskell")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("f(x)")]),t._v(" "),a("td",[t._v("f x")])]),t._v(" "),a("tr",[a("td",[t._v("f(x,y)")]),t._v(" "),a("td",[t._v("f x y")])]),t._v(" "),a("tr",[a("td",[t._v("f(g(x))")]),t._v(" "),a("td",[t._v("f ( g x )")])]),t._v(" "),a("tr",[a("td",[t._v("f(x, g(y) )")]),t._v(" "),a("td",[t._v("f x ( g y )")])]),t._v(" "),a("tr",[a("td",[t._v("f(x)g(y)")]),t._v(" "),a("td",[t._v("f x * g y")])])])]),t._v(" "),a("ul",[a("li",[t._v("하스켈 확장자")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v(".hs\n")])])]),a("h2",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" example")]),t._v(" "),a("ul",[a("li",[t._v("test.hs")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("double x = x + x\nquadruple x = double ( double x )\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ ghci test.hs\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ quadruple 10\n> 40\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ take (double 2) [1,2,3,4,5,6]\n> [1,2,3,4]\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("factorial n = product [1..n]\naverage ns = sum ns ‘div’ length ns\n")])])]),a("ul",[a("li",[a("p",[t._v("x ‘f’ y == f x y")])]),t._v(" "),a("li",[a("p",[t._v("$ :reload"),a("br"),t._v("\n-- reading file\n-- GHCi 는 파일 수정을 detect 하지 않기 때문에 새로 리 로드를 해줘야 함")])])]),t._v(" "),a("h2",{attrs:{id:"naming"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#naming"}},[t._v("#")]),t._v(" Naming")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("lower-case로 시작\nex)\nmyFun\nfun1\narg_2\nx`")])]),t._v(" "),a("li",[a("p",[t._v("list arguments는 s로\nex)\nxs\nns\nnss")])])]),t._v(" "),a("h2",{attrs:{id:"layout-rules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#layout-rules"}},[t._v("#")]),t._v(" Layout Rules")]),t._v(" "),a("ul",[a("li",[t._v("same column 맞추기")])]),t._v(" "),a("h2",{attrs:{id:"useful-ghci-commands"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#useful-ghci-commands"}},[t._v("#")]),t._v(" Useful GHCi Commands")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Mathematics")]),t._v(" "),a("th",[t._v("Haskell")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v(":load {name}")]),t._v(" "),a("td",[t._v("load script {name}")])]),t._v(" "),a("tr",[a("td",[t._v(":reload")]),t._v(" "),a("td",[t._v("reload current script")])]),t._v(" "),a("tr",[a("td",[t._v(":edit {name}")]),t._v(" "),a("td",[t._v("edit script {name}")])]),t._v(" "),a("tr",[a("td",[t._v(":edit")]),t._v(" "),a("td",[t._v("edit current script")])]),t._v(" "),a("tr",[a("td",[t._v(":type {expr}")]),t._v(" "),a("td",[t._v("show type of {expo}")])]),t._v(" "),a("tr",[a("td",[t._v(":?")]),t._v(" "),a("td",[t._v("show all commands")])]),t._v(" "),a("tr",[a("td",[t._v(":quit")]),t._v(" "),a("td",[t._v("quit GHCi")])]),t._v(" "),a("tr",[a("td",[t._v(":t {expr}")]),t._v(" "),a("td",[t._v("{expr} :: {type}")])])])])])}),[],!1,null,null,null);a.default=l.exports}}]);