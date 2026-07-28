(function () {
    'use strict';

    function getInnerCode() {


        var KAOMOJI_MOODS = {
            happy: [
                "(^・ω・^ )","٩(\uff61・ω・\uff61)﻿و","ヽ( ^ω^ ゞ )","´ ▽ ` )\uff89","( • ̀ω•́ )",
                "ヽ(✿\uff9f▽\uff9f)ノ","(≧▽≦)","(≧ω≦)","(\uff61´∀\uff40)\uff89","(●´∀\uff40●)",
                "(\uff89´∀\uff40)\uff89","(\uff61•̀ᴗ-)✧","(\uff40・ω・´)","(´\uff65ᴗ\uff65`)","(๑¯◡¯๑)",
                "(๑˃̵ᴗ˂̵)و","(◍•ᴗ•◍)✧","(๑•̀ㅂ•́)و✧","(\uff89>ω<)\uff89",
                "(*˘︶˘*)","(˘ω˘)✧","(≧∀≦)ゞ","d(`\uff65∀\uff65)b","b(\uffe3▽\uffe3)b"
            ],
            sad: [
                "(╥﹏╥)","(\u3012︿\u3012)","(´;ω;`)","(\uff61•́︿•̀\uff61)",
                "(´∩\uff61• ᵕ •\uff61∩`)","(´\uff65_\uff65`)","\uff61\uff9fヽ(\uff9f´Д`)\uff89\uff9f\uff61"
            ],
            surprised: [
                "(°\uff9b°٥)","∑(\uffe3□\uffe3;)","(;\uff9fд\uff9f)","Σ(lliд\uff9f\uff89)\uff89"
            ],
            angry: [
                "(\uff92 \uff9f\u76bf\uff9f)\uff92","(╯°O°)╯┻━┻","╮(╯∀╰)╭","(\u3002-`ω´-)","┐(´д`)┌"
            ],
            love: [
                "(*´∀`)~♥","ヾ(●゜▽゜●)♡","(╭\uffe33\uffe3)╭♡","(✿ ♥‿♥)",
                "(´▽`ʃ♡ƪ)","(\u706cºωº\u706c)♡","(´,,•ω•,,)♡",
                "(´˘`\uff0a)♡","(˘̩̩̩ε˘̩ƪ)","(´\uff61✪ω✪\uff61`)"
            ],
            shy: [
                "(\u3003∀\u3003)","(\uff61◕∀◕\uff61)","(´ฅωฅ\uff40)","(๑´ㅂ`๑)",
                "(๑´•ω•)","(๑•́ ₃ •̀๑)","(\uff61>﹏<\uff61)","(´˘`\uff0a)♡"
            ],
            sleepy: [
                "(\uffe3o\uffe3) zzZZ","(´-ωก`)","(´-ω-\uff40)","(´\uff61• ω •\uff61`)"
            ],
            cute: [
                "(◕‿◕✿)","(´\uff61• ᵕ •\uff61`)","(*´꒳`*)","(˶ᵔ ᵕ ᵔ˶)",
                "(′ꈍωꈍ‵)","(っ˘ω˘ς)","(´∀\uff40)♡","(◠‿◠✿)",
                "(\u4eba◕‿◕)","(´ω\uff40★)","(\uff61•ᴗ•\uff61)","(´• ω •`)\uff89",
                "(✿◡‿◡)","(´\uff61• ω •\uff61`)","(●´∀\uff40●)"
            ],
            encouraging: [
                "(๑•̀ㅂ•́)و✧","(\uff89>ω<)\uff89","(๑˃̵ᴗ˂̵)و","(◍•ᴗ•◍)✧",
                "(\uff61•̀ᴗ-)✧","b(\uffe3▽\uffe3)b","d(`\uff65∀\uff65)b","(≧∀≦)ゞ",
                "(\uff40・ω・´)","(´\uff65ᴗ\uff65`)","(๑¯◡¯๑)"
            ]
        };



        var ALL_KAOMOJI = [];
        for (var moodKey in KAOMOJI_MOODS) {
            if (KAOMOJI_MOODS.hasOwnProperty(moodKey)) {
                ALL_KAOMOJI = ALL_KAOMOJI.concat(KAOMOJI_MOODS[moodKey]);
            }
        }

        var KAOMOJI_PROB = 0.35;

        function detectSentenceMood(s) {


            if (/\u5f00\u5fc3[\u5fc3]?|\u54c8\u54c8|\u5475\u5475|\u9ad8\u5174|\u5feb\u4e50|\u68d2[\u68d2\u54d2]?|\u597d\u5f00\u5fc3|\u592a\u68d2[\u4e86]?|\u771f\u597d|\u563b\u563b|\u563f\u563f|\u8036[~]?|\u597d\u8036|nice|Nice|ok|OK|\u597d[\u7684\u54d2]|\u4e07\u5c81|\u6210\u529f[\u4e86]?|\u5b8c\u7f8e|\u592a[\u597d\u68d2\u884c]\u5566|\u8212\u670d|\u8212\u5766|\u723d|\u8d85\u723d|\u6ee1\u8db3|\u6ee1\u610f|\u5f97\u610f|\u7f8e\u6ecb\u6ecb|\u4e50\u5475|\u4e50\u5f00\u4e86\u82b1|\u7b11\u6b7b|\u597d\u73a9|\u6709\u8da3|\u6709\u610f\u601d|\u60ca\u559c|\u5e86\u795d|\u795d\u8d3a|\u606d\u559c|happy|Happy|yay|Yay|wow|Wow/.test(s)) return 'happy';



            if (/\u4f24\u5fc3[\u5fc3]?|\u96be\u8fc7|\u54ed[\u54ed]?|\u545c[\u545c]?|\u60b2\u4f24|\u75db\u82e6|\u60f3\u54ed|\u84dd\u7626|\u9999\u83c7|\u59d4\u5c48|\u6cea[\u76ee]?|\u54ed\u4e86|\u597d\u96be\u8fc7|\u60b2\u54c0|\u60b2\u50ac|\u624e\u5fc3|\u5fc3\u585e|\u5fc3\u788e|\u5fc3\u75db|\u5fc3\u7d2f|\u5d29\u6e83|\u90c1\u95f7|\u5fe7\u6101|\u5fe7\u4f24|\u4f24\u611f|\u5931\u843d|\u7edd\u671b|\u6d88\u6c89|\u6cae\u4e27|\u9893\u5e9f|\u81ea\u95ed|\u618b\u5c48|\u6cea\u76ee|\u6cea\u5954|\u6cea\u6d41|sad|Sad|cry|Cry/.test(s)) return 'sad';



            if (/\u751f\u6c14[\u6c14]?|\u6c14\u6b7b|\u597d\u6c14|\u70e6[\u6b7b]?|\u8ba8\u538c|\u53ef\u6076|\u706b\u5927|\u6012[\u4e86]?|\u6293\u72c2|\u6c14\u9f13\u9f13|\u6c14\u70b8|\u6c14\u7206|\u6c14\u6124|\u6124\u6012|\u607c\u706b|\u53d1\u706b|\u66b4\u6012|\u4e0d\u723d|\u70e6\u8e81|\u66b4\u8e81|\u66b4\u8d70|\u70b8\u6bdb|\u8df3\u811a|\u6068\u6b7b|\u6076\u5fc3|\u53d7\u4e0d\u4e86|\u5fcd\u4e0d\u4e86|\u4e0d\u80fd\u5fcd|\u5c82\u6709\u6b64\u7406|\u592a\u8fc7\u5206\u4e86|\u641e\u4ec0\u4e48|\u70e6\u6b7b\u4e86|\u70e6\u4eba|\u8d70\u5f00|\u95ea\u5f00|\u95ed\u5634|\u61d2\u5f97\u7406|angry|Angry|mad|Mad/.test(s)) return 'angry';



            if (/\u54c7[\u55b5]?|\u771f\u7684[\u5417\u561b]?|\u4e0d\u4f1a\u5427|\u5929\u54ea|\u5929\u5450|\u9707\u60ca|\u5413[\u6b7b\u4e00\u8df3]?|\u60ca[\u8bb6]?|OMG|omg|Oh my god|oh my|my god|\u554a\u54a7|\u8bf6[?\uff1f]|\u4ec0\u4e48[\uff1f\uff01]|\u5565[\uff1f\uff01]|\u7eb3\u5c3c|nani|\u4e0d\u662f\u5427|\u771f\u5047|\u771f\u7684\u5047\u7684|\u96be\u4ee5\u7f6e\u4fe1|\u4e0d\u53ef\u601d\u8bae|\u5413\u4e86\u6211\u4e00\u8df3|\u5927\u5403\u4e00\u60ca|\u76ee\u77aa\u53e3\u5446|\u60ca\u8273|\u60ca\u5947|\u60ca\u8bb6|\u5403\u60ca|\u9707\u64bc|\u795e\u9a6c[\uff1f\uff01]|\u9a97\u4eba[\u7684\u5427]|\u4f60\u8bf4\u5565|\u5367\u69fd|\u6211\u53bb|\u6211\u9760|\u6211\u5929|\u6211\u6655|\u6211\u7684\u5988|\u5988\u5440|\u5929\u554a|\u8001\u5929|\u8001\u5929\u7237|\u54c7\u585e|\u54c7\u5594|\u545c\u54c7|\u54ce\u5440/.test(s)) return 'surprised';



            if (/\u559c\u6b22|\u7231[\u7231]?|\u60f3[\u4f60\u5ff5]|\u4e48\u4e48|\u4eb2\u4eb2|\u62b1\u62b1|\u7231\u4f60|\u60f3\u4f60|♥|❤|♡|\u597d\u559c\u6b22|\u8d85\u559c\u6b22|\u7092\u9e21\u559c\u6b22|\u6572\u559c\u6b22|\u6700\u559c\u6b22|\u5fc3\u52a8|\u5fc3\u8df3|\u604b\u7231|\u751c\u751c|\u751c\u871c|\u6d6a\u6f2b|\u6e29\u67d4|\u5ba0\u6eba|\u5475\u62a4|\u4f53\u8d34|\u6696\u5fc3|\u597d\u6696|\u9165\u4e86|\u840c\u5316\u4e86|\u53ef\u7231\u6b7b\u4e86|\u597d\u53ef\u7231|\u771f\u53ef\u7231|\u8d85\u53ef\u7231|love|Love|like|Like|miss|Miss|kiss|Kiss/.test(s)) return 'love';



            if (/\u5bb3\u7f9e|\u4e0d\u597d\u610f\u601d|\u7f9e[\u7f9e]?|\u5c34\u5c2c|\u96be\u4e3a\u60c5|⁄|\u8138\u7ea2|⁄\(|\u5bb3\u81ca|\u7f9e\u6da9|\u7f9e\u602f|\u7f9e\u7b54\u7b54|\u6342\u8138|\u4e0d\u6562\u770b|\u6ca1\u8138\u89c1\u4eba|\u7f9e\u6b7b|shy|Shy|embarrassed/.test(s)) return 'shy';



            if (/\u56f0[\u56f0]?|\u665a\u5b89|\u7761[\u4e86\u89c9]|\u778c\u7761|\u597d\u7d2f|zzZ|Zzz|Zz|zzz|\u6253\u54c8\u6b20|\u75b2\u60eb|\u75b2\u52b3|\u75b2\u5026|\u4e4f\u4e86|\u7d2f\u4e86|\u6ca1\u7cbe\u795e|\u660f\u660f\u6b32\u7761|\u7741\u4e0d\u5f00\u773c|\u8be5\u7761\u4e86|\u788e\u89c9|\u505a\u68a6|tired|Tired|sleepy|Sleepy|goodnight/.test(s)) return 'sleepy';



            if (/\u52a0\u6cb9|\u52aa\u529b|\u575a\u6301|\u4f60\u53ef\u4ee5|\u76f8\u4fe1|\u4e00\u5b9a\u884c|\u4e00\u5b9a\u80fd|\u522b\u653e\u5f03|\u522b\u7070\u5fc3|\u522b\u6c14\u9981|\u632f\u4f5c|\u518d\u63a5\u518d\u5389|\u52a0\u6cb9\u9e2d|\u52a0\u6cb9\u5450|\u5e72\u5df4\u7239|\u51b2\u51b2\u51b2|\u51b2\u9e2d|\u4e0d\u8981\u7d27|\u6ca1\u5173\u7cfb|\u6ca1\u4e8b\u7684|\u6ca1\u4e8b\u54d2|\u653e\u5fc3|\u6700\u597d|\u6700\u68d2|\u4f60\u6700\u68d2|fight|Fight|come on|Come on|cheer/.test(s)) return 'encouraging';

            return '';
        }

        function addRandomKaomoji(text) {
            if (/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u.test(text)) return text;



            var sentences = text.split(/([\u3002\uff01\uff1f.!?\n]+)/);
            var changed = false;
            for (var si = 0; si < sentences.length; si++) {
                if (si % 2 === 0 && sentences[si] && sentences[si].length >= 2) {
                    if (Math.random() >= KAOMOJI_PROB) continue;
                    var mood = detectSentenceMood(sentences[si]);
                    var pool = mood && KAOMOJI_MOODS[mood] ? KAOMOJI_MOODS[mood] : KAOMOJI_MOODS.cute;
                    var k = pool[Math.floor(Math.random() * pool.length)];
                    sentences[si] = sentences[si] + k;
                    changed = true;
                }
            }
            if (changed) return sentences.join('');



            if (Math.random() >= KAOMOJI_PROB) return text;
            var k2 = ALL_KAOMOJI[Math.floor(Math.random() * ALL_KAOMOJI.length)];
            return text + k2;
        }

        var DEFAULT_PHRASE_POOL = "\u55b5~,\u7684\u8bf4~,\u5450~,\u55f7~,\u8bf6\u563f~,\u54aa\u556a~,\u547c\u55b5~,\u55ef\u54fc~,\u545c~,\u561b~,\u54d2~,\u5566~,\u634f~,\u6ef4~,\u55b5\u545c~,\u557e~";

        function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function shouldSkipAppend(clause) {
            if (!clause || clause.length < 3) return true;
            if (/[\uff08\(\[\u3010\u300e\)\]\u3011\u300f]$/.test(clause)) return true;
            if (hasUnclosedCJK(clause)) return true;
            if (/[a-zA-Z0-9]$/.test(clause)) return true;
            return false;
        }

        function hasUnclosedCJK(text) {
            var lo = text.lastIndexOf('\uff08');
            if (lo === -1) return false;
            var lc = text.lastIndexOf('\uff09');
            return lc < lo;
        }







        function replaceParticles(text) {
            var parts = text.split(/([\uff0c,\u3001\uff1b;……\u2026\u2025\s\u3002\uff01\uff1f.!?]+)/);
            for (var i = 0; i < parts.length; i++) {
                if (i % 2 === 0 && parts[i]) {
                    var c = parts[i];


                    if (/[\u5566\u561b\u53ed\u634f\u9e2d\u6ef4\u7d20\u55b5\u54d2\u54df\u55f7\u5440\u545c]([\u3002\uff01\uff1f.!?\uff01\uff1f~…]*)$/.test(c)) continue;

                    var o = c;



                    var _protectMap = {};
                    var _protectIdx = 0;


                    c = c.replace(/([\u4e00-\u9fff])\1([\u4e00-\u9fff])\2/g, function(m) {
                        var k = '\x00IDM' + (_protectIdx++) + '\x00';
                        _protectMap[k] = m;
                        return k;
                    });


                    c = c.replace(/([\u4e00-\u9fff]{2})\1/g, function(m) {
                        var k = '\x00IDM' + (_protectIdx++) + '\x00';
                        _protectMap[k] = m;
                        return k;
                    });


                    c = c.replace(/(\u4e00\u5fc3\u4e00\u610f|\u4e00\u4e94\u4e00\u5341|\u4e09\u5fc3\u4e8c\u610f|\u4e71\u4e03\u516b\u7cdf|\u4e03\u4e0a\u516b\u4e0b|\u5341\u5168\u5341\u7f8e|\u767e\u53d1\u767e\u4e2d|\u5343\u519b\u4e07\u9a6c|\u4e07\u4f17\u4e00\u5fc3|\u9a6c\u5230\u6210\u529f|\u9f99\u9a6c\u7cbe\u795e|\u4e00\u5e06\u98ce\u987a|\u4e00\u8def\u5e73\u5b89|\u4e07\u4e8b\u5982\u610f|\u5fc3\u60f3\u4e8b\u6210|\u606d\u559c\u53d1\u8d22|\u65b0\u5e74\u5feb\u4e50|\u751f\u65e5\u5feb\u4e50|\u8eab\u4f53\u5065\u5eb7|\u5b66\u4e1a\u8fdb\u6b65|\u5f00\u5f00\u5fc3\u5fc3|\u5feb\u5feb\u4e50\u4e50|\u5e73\u5e73\u5b89\u5b89|\u987a\u987a\u5229\u5229|\u7ea2\u7ea2\u706b\u706b|\u660e\u660e\u767d\u767d|\u6e05\u6e05\u695a\u695a|\u5e72\u5e72\u51c0\u51c0|\u6574\u6574\u9f50\u9f50|\u6f02\u6f02\u4eae\u4eae|\u5927\u5927\u65b9\u65b9|\u8001\u8001\u5b9e\u5b9e|\u8ba4\u8ba4\u771f\u771f|\u52e4\u52e4\u6073\u6073|\u5162\u5162\u4e1a\u4e1a|\u8f70\u8f70\u70c8\u70c8|\u98ce\u98ce\u706b\u706b|\u5306\u5306\u5fd9\u5fd9|\u9ad8\u9ad8\u5174\u5174|\u5feb\u5feb\u4e50\u4e50|\u82b1\u82b1\u7eff\u7eff|\u5bc6\u5bc6\u9ebb\u9ebb|\u661f\u661f\u70b9\u70b9|\u5bb6\u5bb6\u6237\u6237|\u4e16\u4e16\u4ee3\u4ee3|\u65e5\u65e5\u591c\u591c|\u65f6\u65f6\u523b\u523b|\u5206\u5206\u79d2\u79d2|\u5e74\u5e74\u6708\u6708|\u4e0a\u4e0a\u4e0b\u4e0b|\u524d\u524d\u540e\u540e|\u5de6\u5de6\u53f3\u53f3|\u91cc\u91cc\u5916\u5916|\u53cd\u53cd\u590d\u590d|\u75db\u75db\u5feb\u5feb|\u8212\u8212\u670d\u670d|\u5b89\u5b89\u9759\u9759|\u8e0f\u8e0f\u5b9e\u5b9e|\u5b9e\u5b9e\u5728\u5728|\u786e\u786e\u5b9e\u5b9e|\u771f\u771f\u5207\u5207|\u660e\u660e\u767d\u767d|\u606d\u606d\u656c\u656c|\u6d69\u6d69\u8361\u8361|\u5802\u5802\u6b63\u6b63|\u5f62\u5f62\u8272\u8272|\u4e09\u4e09\u4e24\u4e24|\u541e\u541e\u5410\u5410|\u552f\u552f\u8bfa\u8bfa|\u6d0b\u6d0b\u6d12\u6d12|\u671d\u671d\u66ae\u66ae)/g, function(m) {
                        var k = '\x00IDM' + (_protectIdx++) + '\x00';
                        _protectMap[k] = m;
                        return k;
                    });





                    c = c.replace(/\u662f\u4e0d\u662f/g, '\u7d20\u4e0d\u7d20');
                    c = c.replace(/\u6709\u6ca1\u6709/g, '\u6709\u6728\u6709');
                    c = c.replace(/\u53ef\u4e0d\u53ef\u4ee5/g, '\u9614\u4e0d\u9614\u4ee5');
                    c = c.replace(/\u597d\u4e0d\u597d/g, '\u597d\u4e0d\u5566');
                    c = c.replace(/\u8981\u4e0d\u8981/g, '\u8981\u4e0d\u8981\u7684\u8bf4');
                    c = c.replace(/\u4e0d\u8ba4\u8bc6/g, '\u4e0d\u8ba4\u5f97');
                    c = c.replace(/\u539f\u6765\u5982\u6b64/g, '\u539f\u6765\u5982\u6b64\u55b5');
                    c = c.replace(/\u600e\u4e48\u56de\u4e8b/g, '\u80bf\u4e48\u56de\u4e8b');
                    c = c.replace(/\u4e3a\u4ec0\u4e48/g, '\u4e3a\u795e\u9a6c');
                    c = c.replace(/\u4e0d\u77e5\u9053/g, '\u4e0d\u6653\u5f97');
                    c = c.replace(/\u5bf9\u4e0d\u8d77/g, '\u5bf9\u4e0d\u8d77\u6ef4\u8bf4');
                    c = c.replace(/\u6ca1\u5173\u7cfb\u7684/g, '\u6ca1\u5173\u7cfb\u6ef4');
                    c = c.replace(/\u597d\u53ef\u7231/g, '\u597d\u9614\u7231');
                    c = c.replace(/\u597d\u559c\u6b22/g, '\u597d\u559c\u7ffb');
                    c = c.replace(/\u77e5\u9053\u4e86/g, '\u77e5\u9053\u5566');
                    c = c.replace(/\u660e\u767d\u4e86/g, '\u660e\u767d\u5566');
                    c = c.replace(/\u4e86\u89e3\u4e86/g, '\u4e86\u89e3\u5566');
                    c = c.replace(/\u8fd9\u6837\u5b50/g, '\u9171\u7d2b');
                    c = c.replace(/\u90a3\u6837\u5b50/g, '\u917f\u7d2b');
                    c = c.replace(/\u600e\u4e48\u6837/g, '\u80bf\u4e48\u6837');
                    c = c.replace(/\u8fd9\u6837\u8bf4/g, '\u9171\u8bf4');
                    c = c.replace(/\u8fd9\u6837/g, '\u9171\u7d2b');
                    c = c.replace(/\u90a3\u6837/g, '\u917f\u7d2b');
                    c = c.replace(/\u56e0\u4e3a/g, '\u56e0\u80c3');
                    c = c.replace(/\u4f46\u662f/g, '\u4f46\u7d20');
                    c = c.replace(/\u8fd8\u662f/g, '\u8fd8\u7d20');
                    c = c.replace(/\u771f\u662f/g, '\u771f\u7d20');
                    c = c.replace(/\u4e0d\u662f/g, '\u4e0d\u7d20');
                    c = c.replace(/\u5c31\u662f/g, '\u5c31\u7d20');
                    c = c.replace(/\u7b97\u662f/g, '\u7b97\u7d20');
                    c = c.replace(/\u53ef\u662f/g, '\u53ef\u7d20');
                    c = c.replace(/\u53ea\u662f/g, '\u53ea\u7d20');
                    c = c.replace(/\u975e\u5e38/g, '\u7092\u9e21');
                    c = c.replace(/\u5341\u5206/g, '\u7092\u9e21');
                    c = c.replace(/\u771f\u5fc3/g, '\u7092\u9e21');
                    c = c.replace(/\u7279\u522b/g, '\u7092\u9e21');
                    c = c.replace(/\u8fd9\u4e2a/g, '\u4ecb\u4e2a');
                    c = c.replace(/\u90a3\u4e2a/g, '\u8fa3\u4e2a');
                    c = c.replace(/\u600e\u4e48/g, '\u80bf\u4e48');
                    c = c.replace(/\u4e0d\u559c\u6b22/g, '\u4e0d\u559c\u6b22\u55b5');
                    c = c.replace(/\u4e0d\u53ef\u4ee5/g, '\u4e0d\u53ef\u4ee5\u5566');
                    c = c.replace(/\u4e0d\u53ef\u80fd/g, '\u4e0d\u53ef\u80fd\u55b5');
                    c = c.replace(/\u4e0d\u6ee1\u610f/g, '\u4e0d\u6ee1\u610f\u55b5');
                    c = c.replace(/\u4e0d\u5ba2\u6c14/g, '\u4e0d\u5ba2\u6c14\u9e2d');
                    c = c.replace(/\u4e0d\u540c\u610f/g, '\u4e0d\u540c\u610f\u5566');
                    c = c.replace(/\u559c\u6b22/g, '\u559c\u7ffb');
                    c = c.replace(/\u53ef\u4ee5/g, '\u9614\u4ee5');
                    c = c.replace(/\u53ef\u7231/g, '\u9614\u7231');
                    c = c.replace(/\u597d\u7684/g, '\u597d\u54d2');
                    c = c.replace(/\u771f\u7684/g, '\u771f\u54d2');
                    c = c.replace(/\u5bf9\u7684/g, '\u5bf9\u54d2');
                    c = c.replace(/\u61c2\u7684/g, '\u61c2\u54d2');
                    c = c.replace(/\u662f\u7684/g, '\u662f\u7684\u55b5');
                    c = c.replace(/\u597d\u7684\u5427/g, '\u597d\u53ed');
                    c = c.replace(/\u597d\u5427/g, '\u597d\u53ed');
                    c = c.replace(/\u597d\u4e86/g, '\u597d\u5566');
                    c = c.replace(/\u5bf9\u4e86/g, '\u5bf9\u5566');
                    c = c.replace(/\u7b97\u4e86/g, '\u7b97\u5566');
                    c = c.replace(/\u884c\u4e86/g, '\u884c\u5566');
                    c = c.replace(/\u73b0\u5728/g, '\u73b0\u5728\u55b5');
                    c = c.replace(/\u9a6c\u4e0a/g, '\u9a6c\u4e0a\u54d2');
                    c = c.replace(/\u7acb\u523b/g, '\u7acb\u523b\u54d2');
                    c = c.replace(/\u5df2\u7ecf/g, '\u5df2\u7ecf\u5566');
                    c = c.replace(/\u521a\u521a/g, '\u521a\u521a\u54d2');
                    c = c.replace(/\u9a6c\u4e0a\u9a6c\u4e0a/g, '\u9a6c\u4e0a\u9a6c\u4e0a');
                    c = c.replace(/\u4eca\u5929/g, '\u4eca\u5929\u54d2');
                    c = c.replace(/\u660e\u5929/g, '\u660e\u5929\u54d2');
                    c = c.replace(/\u6628\u5929/g, '\u6628\u5929\u54d2');
                    c = c.replace(/\u65e9\u4e0a/g, '\u65e9\u4e0a\u55b5');
                    c = c.replace(/\u4e2d\u5348/g, '\u4e2d\u5348\u55b5');
                    c = c.replace(/\u4e0b\u5348/g, '\u4e0b\u5348\u55b5');
                    c = c.replace(/\u665a\u4e0a/g, '\u665a\u4e0a\u6ef4');
                    c = c.replace(/\u521a\u624d/g, '\u521a\u624d\u54d2');
                    c = c.replace(/\u6bcf\u5929/g, '\u6bcf\u5929\u55b5');
                    c = c.replace(/\u6bcf\u5468/g, '\u6bcf\u5468\u55b5');
                    c = c.replace(/\u6bcf\u6708/g, '\u6bcf\u6708\u55b5');
                    c = c.replace(/\u6bcf\u5e74/g, '\u6bcf\u5e74\u55b5');
                    c = c.replace(/\u6574\u5929/g, '\u6574\u5929\u55b5');
                    c = c.replace(/\u6574\u665a/g, '\u6574\u665a\u55b5');
                    c = c.replace(/\u597d\u4e45/g, '\u597d\u4e45\u55b5');
                    c = c.replace(/\u5f88\u4e45/g, '\u5f88\u4e45\u55b5');
                    c = c.replace(/\u591a\u5e74/g, '\u591a\u5e74\u55b5');
                    c = c.replace(/\u7ec8\u4e8e/g, '\u7ec8\u4e8e\u55b5');
                    c = c.replace(/\u4ece\u6765/g, '\u4ece\u6765\u55b5');
                    c = c.replace(/\u4e00\u76f4/g, '\u4e00\u76f4\u55b5');
                    c = c.replace(/\u603b\u662f/g, '\u603b\u662f\u55b5');
                    c = c.replace(/\u7ecf\u5e38/g, '\u7ecf\u5e38\u55b5');
                    c = c.replace(/\u6bcf\u6b21/g, '\u6bcf\u6b21\u55b5');
                    c = c.replace(/\u5076\u5c14/g, '\u5076\u5c14\u55b5');
                    c = c.replace(/\u6709\u65f6/g, '\u6709\u65f6\u55b5');
                    c = c.replace(/\u5f85\u4f1a\u513f/g, '\u5f85\u4f1a\u513f\u55b5');



                    c = c.replace(/\u5417(\uff1f?)$/, '\u561b$1');
                    c = c.replace(/\u5427$/, '\u53ed');
                    c = c.replace(/\u5462$/, '\u634f');
                    c = c.replace(/\u5440$/, '\u9e2d');
                    c = c.replace(/\u54e6$/, '\u55b5');
                    c = c.replace(/\u5594$/, '\u55b5');
                    c = c.replace(/\u5662$/, '\u55b5');
                    c = c.replace(/\u554a$/, '\u5440');
                    c = c.replace(/\u55ef$/, '\u5514');
                    c = c.replace(/\u5475$/, '\u563b\u563b');
                    c = c.replace(/([^\u5566])\u4e86$/, '$1\u5566');
                    c = c.replace(/([\u4e00-\u9fff])\u7684$/, '$1\u6ef4');
                    c = c.replace(/\u662f$/, '\u7d20');
                    c = c.replace(/\u597d\uff01$/, '\u597d\u54d2');
                    c = c.replace(/\u884c\uff01$/, '\u884c\u54d2');
                    c = c.replace(/\u55ef$/, '\u55ef\u5450');



                    c = c.replace(/^\u6211(\u8981|\u60f3|\u53bb|\u6765|\u4f1a|\u80fd|\u53ef\u4ee5|\u51b3\u5b9a|\u51b3\u5b9a|\u89c9\u5f97|\u8ba4\u4e3a|\u4e00\u5b9a|\u80af\u5b9a)/, '\u4eba\u5bb6$1');
                    c = c.replace(/^\u6211(\u662f|\u5728|\u6709|\u770b|\u542c|\u8bf4|\u95ee|\u505a|\u73a9|\u5403|\u559d|\u4e70|\u62ff|\u627e|\u7b49)/, '\u4eba\u5bb6$1');
                    c = c.replace(/^\u4f60(\u597d|\u5403|\u559d|\u73a9|\u770b|\u542c|\u8bf4|\u53bb|\u6765|\u8981|\u4f1a|\u80fd)/, '\u4e43$1');
                    c = c.replace(/^\u6211\u7684/, '\u5076\u6ef4');
                    c = c.replace(/\u4f60\u7684/g, '\u4e43\u6ef4');
                    c = c.replace(/\u6211\u7684/g, '\u5076\u6ef4');
                    c = c.replace(/\u81ea\u5df1/g, '\u81ea\u4e2a\u513f');
                    c = c.replace(/\u6211\u4eec/g, '\u6211\u4eec\u54d2');
                    c = c.replace(/\u4f60\u4eec/g, '\u4f60\u4eec\u55b5');
                    c = c.replace(/\u4ed6\u4eec/g, '\u4ed6\u4eec\u55b5');
                    c = c.replace(/\u5927\u5bb6/g, '\u5927\u5bb6\u4f19');
                    c = c.replace(/\u670b\u53cb/g, '\u76c6\u53cb');
                    c = c.replace(/\u540c\u5b66/g, '\u7ae5\u978b');
                    c = c.replace(/\u5144\u5f1f/g, '\u5144\u561a');
                    c = c.replace(/\u59d0\u59b9/g, '\u96c6\u7f8e');
                    c = c.replace(/\u5b9d\u8d1d/g, '\u5c0f\u5b9d\u8d1d');
                    c = c.replace(/\u4eb2\u7231\u7684/g, '\u4eb2\u7231\u54d2');
                    c = c.replace(/\u5b9d\u5b9d/g, '\u5c0f\u5b9d\u5b9d');
                    c = c.replace(/\u4e56\u4e56/g, '\u5c0f\u4e56\u4e56');
                    c = c.replace(/\u751c\u5fc3/g, '\u5c0f\u5fc3\u5fc3');
                    c = c.replace(/\u7237\u7237/g, '\u7237\u7237\u7237');
                    c = c.replace(/\u5976\u5976/g, '\u5976\u5976\u5976');
                    c = c.replace(/\u7238\u7238/g, '\u7238\u6bd4');
                    c = c.replace(/\u5988\u5988/g, '\u5988\u54aa');
                    c = c.replace(/\u59d0\u59d0/g, '\u59d0\u59d0\u9171');
                    c = c.replace(/\u54e5\u54e5/g, '\u6b27\u5c3c\u9171');
                    c = c.replace(/\u59b9\u59b9/g, '\u59b9\u59b9\u9171');
                    c = c.replace(/\u5f1f\u5f1f/g, '\u5f1f\u5f1f\u9171');
                    c = c.replace(/\u524d\u8f88/g, '\u524d\u8f88\u6851');
                    c = c.replace(/\u5927\u795e/g, '\u5927\u55b5\u795e');
                    c = c.replace(/\u5927\u8001/g, '\u5927\u55b5\u8001');
                    c = c.replace(/\u7fa4\u4e3b/g, '\u7fa4\u4e3b\u55b5');
                    c = c.replace(/\u697c\u4e3b/g, '\u697c\u4e3b\u55b5');



                    c = c.replace(/\u8c22\u8c22\u54d2/g, '\u8c22\u8c22\u54d2');

                    c = c.replace(/\u8c22\u8c22/g, '\u8c22\u8c22\u54d2');
                    c = c.replace(/\u591a\u8c22/g, '\u591a\u8c22\u5566');
                    c = c.replace(/\u611f\u8c22/g, '\u611f\u8c22\u55b5');
                    c = c.replace(/\u62b1\u6b49/g, '\u62b1\u6b49\u5566');
                    c = c.replace(/\u6ca1\u4e8b/g, '\u6ca1\u4e8b\u54d2');
                    c = c.replace(/\u6ca1\u5173\u7cfb/g, '\u6ca1\u5173\u7cfb\u54d2');
                    c = c.replace(/\u4e0d\u8981/g, '\u4e0d\u8981\u5566');
                    c = c.replace(/\u4e0d\u884c/g, '\u4e0d\u884c\u5566');
                    c = c.replace(/\u4e0d\u597d/g, '\u4e0d\u597d\u5566');
                    c = c.replace(/\u4e0d\u60f3/g, '\u4e0d\u60f3\u5566');
                    c = c.replace(/\u4e0d\u4f1a/g, '\u4e0d\u4f1a\u5566');
                    c = c.replace(/\u4e0d\u61c2/g, '\u4e0d\u61c2\u5566');



                    c = c.replace(/\u8ba8\u538c/g, '\u8ba8\u538c\u5566');
                    c = c.replace(/\u7b28\u86cb/g, '\u7b28\u86cb\u55b5');
                    c = c.replace(/\u50bb\u74dc/g, '\u5c0f\u50bb\u74dc');
                    c = c.replace(/\u574f\u86cb/g, '\u574f\u574f');
                    c = c.replace(/\u9a97\u5b50/g, '\u9a97\u7eb8');
                    c = c.replace(/\u52a0\u6cb9/g, '\u52a0\u6cb9\u5450');
                    c = c.replace(/\u5389\u5bb3/g, '\u597d\u5389\u5bb3\u7684\u8bf4');
                    c = c.replace(/\u68d2\u68d2/g, '\u68d2\u68d2\u54d2');
                    c = c.replace(/\u5f88\u68d2/g, '\u7092\u9e21\u68d2');
                    c = c.replace(/\u4e0d\u9519/g, '\u4e0d\u9519\u634f');
                    c = c.replace(/\u53ef\u601c/g, '\u53ef\u601c\u55b5');
                    c = c.replace(/\u5f00\u5fc3/g, '\u5f00\u718f');
                    c = c.replace(/\u751f\u6c14/g, '\u751f\u6c14\u6c14');
                    c = c.replace(/\u5bb3\u6015/g, '\u6015\u6015\u55b5');
                    c = c.replace(/\u62c5\u5fc3/g, '\u62c5\u55b5\u5fc3');
                    c = c.replace(/\u7d27\u5f20/g, '\u7d27\u5f20\u55b5');
                    c = c.replace(/\u671f\u5f85/g, '\u671f\u5f85\u55b5');
                    c = c.replace(/\u5931\u671b/g, '\u5931\u671b\u55b5');
                    c = c.replace(/\u60ca\u559c/g, '\u60ca\u559c\u55b5');
                    c = c.replace(/\u6ee1\u8db3/g, '\u6ee1\u8db3\u55b5');
                    c = c.replace(/\u6ee1\u610f/g, '\u6ee1\u610f\u54d2');
                    c = c.replace(/\u611f\u52a8/g, '\u611f\u52a8\u55b5');
                    c = c.replace(/\u7fa1\u6155/g, '\u7fa1\u6155\u55b5');
                    c = c.replace(/\u5ac9\u5992/g, '\u5ac9\u5992\u55b5');
                    c = c.replace(/\u60f3\u5ff5/g, '\u60f3\u55b5');
                    c = c.replace(/\u6000\u5ff5/g, '\u6000\u5ff5\u55b5');
                    c = c.replace(/\u8ba8\u538c\u8ba8\u538c/g, '\u8ba8\u538c\u8ba8\u538c');
                    c = c.replace(/\u559c\u6b22\u559c\u6b22/g, '\u559c\u6b22\u559c\u6b22');
                    c = c.replace(/\u7231/g, '\u7231\u7231');



                    c = c.replace(/^\u54c8\u54c8/, '\u5657\u54c8\u54c8\u54c8');
                    c = c.replace(/^\u5475\u5475/, '\u563b\u563b');
                    c = c.replace(/^\u563f\u563f/, '\u563f\u563f\u563f');
                    c = c.replace(/^\u5514/, '\u5514\u5514');
                    c = c.replace(/^\u54ce/, '\u54ce\u563f');
                    c = c.replace(/^\u54c7/, '\u54c7\u55b5');
                    c = c.replace(/^\u54e6/, '\u54e6\u55b5');
                    c = c.replace(/^\u554a/, '\u554a\u5440');
                    c = c.replace(/^\u55ef\u54fc/, '\u55ef\u54fc~');
                    c = c.replace(/^\u6b38/, '\u6b38\u563f\u563f');
                    c = c.replace(/^\u54c7\u54e6/, '\u54c7\u55b5');
                    c = c.replace(/^\u5929\u54ea/, '\u5929\u55b5');
                    c = c.replace(/^\u5929\u5450/, '\u5929\u5450\u55b5');
                    c = c.replace(/^\u6211\u7684\u5929/, '\u5076\u6ef4\u5929\u55b5');
                    c = c.replace(/^\u4e0d\u4f1a\u5427/, '\u4e0d\u4f1a\u53ed');
                    c = c.replace(/^\u4e0d\u662f\u5427/, '\u4e0d\u7d20\u53ed');
                    c = c.replace(/^\u771f\u7684\u5047\u7684/, '\u771f\u54d2\u5047\u7684\u55b5');
                    c = c.replace(/^\u600e\u4e48\u53ef\u80fd/, '\u80bf\u4e48\u53ef\u80fd\u55b5');



                    c = c.replace(/\u62b1\u62b1/g, '\u62b1\u62b1');
                    c = c.replace(/\u62b1([\u4f60\u6211\u4ed6])/g, '\u62b1\u62b1$1');
                    c = c.replace(/\u770b([\u4f60\u6211])/g, '\u770b\u770b$1');
                    c = c.replace(/\u7b49([\u4f60\u6211])/g, '\u7b49\u7b49$1');
                    c = c.replace(/\u8bd5([\u770b])/g, '\u8bd5\u8bd5$1');
                    c = c.replace(/\u73a9([\u5427])/g, '\u73a9\u73a9$1');
                    c = c.replace(/\u7b11([\u7740])/g, '\u7b11\u7b11$1');
                    c = c.replace(/\u4e56/g, '\u4e56\u4e56');
                    c = c.replace(/\u6162\u6162/g, '\u6162\u6162\u6162');
                    c = c.replace(/\u653e\u5fc3/g, '\u653e\u5fc3\u597d\u5566');
                    c = c.replace(/\u5c0f\u5fc3/g, '\u5c0f\u5fc3\u5fc3');
                    c = c.replace(/\u6d17\u6fa1/g, '\u6d17\u6fa1\u6fa1');
                    c = c.replace(/\u6d17\u624b/g, '\u6d17\u624b\u624b');
                    c = c.replace(/\u6d17\u811a/g, '\u6d17\u811a\u811a');
                    c = c.replace(/\u6d17\u8138/g, '\u6d17\u8138\u8138');
                    c = c.replace(/\u770b\u4e66/g, '\u770b\u4e66\u4e66');
                    c = c.replace(/\u542c\u6b4c/g, '\u542c\u542c\u6b4c');
                    c = c.replace(/\u5531\u6b4c/g, '\u5531\u5531\u6b4c');
                    c = c.replace(/\u8df3\u821e/g, '\u8df3\u8df3\u821e');
                    c = c.replace(/\u6563\u6b65/g, '\u6563\u6563\u6b65');
                    c = c.replace(/\u8dd1\u6b65/g, '\u8dd1\u8dd1\u6b65');
                    c = c.replace(/\u5077\u7b11/g, '\u5077\u5077\u7b11');
                    c = c.replace(/\u5fae\u7b11/g, '\u5fae\u5fae\u7b11');
                    c = c.replace(/\u591a\u5403/g, '\u591a\u591a\u5403');
                    c = c.replace(/\u591a\u559d/g, '\u591a\u591a\u559d');
                    c = c.replace(/\u591a\u7761/g, '\u591a\u591a\u7761');
                    c = c.replace(/\u62ff/g, '\u62ff\u62ff');



                    c = c.replace(/^\u4f60\u597d\u5440/, '\u4f60\u597d\u5440');
                    c = c.replace(/^\u4f60\u597d/, '\u4f60\u597d\u5440');
                    c = c.replace(/^\u60a8\u597d/, '\u60a8\u597d\u9e2d');
                    c = c.replace(/^\u65e9\u5b89/, '\u65e9\u5b89\u55b5');
                    c = c.replace(/^\u665a\u5b89/, '\u665a\u5b89\u55b5');
                    c = c.replace(/^\u62dc\u62dc/, '\u63b0\u63b0\u55b5');
                    c = c.replace(/^\u518d\u89c1/, '\u518d\u89c1\u5566');
                    c = c.replace(/^\u55ef\u55ef/, '\u55ef\u55ef~');
                    c = c.replace(/^\u65e9\u4e0a\u597d/, '\u65e9\u4e0a\u597d\u9e2d');
                    c = c.replace(/^\u4e2d\u5348\u597d/, '\u4e2d\u5348\u597d\u55b5');
                    c = c.replace(/^\u665a\u4e0a\u597d/, '\u665a\u4e0a\u597d\u9e2d');
                    c = c.replace(/^\u5927\u5bb6\u597d/, '\u5927\u5bb6\u597d\u55b5');
                    c = c.replace(/^\u55e8/, '\u55e8\u55b5');
                    c = c.replace(/^\u54c8\u55bd/, '\u54c8\u55bd\u55b5');
                    c = c.replace(/^hello/i, '\u54c8\u55bd\u55b5');
                    c = c.replace(/^hi/i, '\u55e8\u55b5');
                    c = c.replace(/^\u597d\u4e45\u4e0d\u89c1/, '\u597d\u4e45\u4e0d\u89c1\u55b5');
                    c = c.replace(/^\u6b22\u8fce/, '\u6b22\u8fce\u55b5');
                    c = c.replace(/^\u8f9b\u82e6\u4e86/, '\u8f9b\u82e6\u5566\u55b5');
                    c = c.replace(/^\u65b0\u5e74\u597d/, '\u65b0\u5e74\u597d\u55b5');



                    c = c.replace(/\u5403\u996d/g, '\u6b21\u996d');
                    c = c.replace(/\u5403\u4e1c\u897f/g, '\u6b21\u4e1c\u897f');
                    c = c.replace(/\u597d\u5403\u7684/g, '\u597d\u6b21\u7684');
                    c = c.replace(/\u597d\u5403/g, '\u597d\u6b21');
                    c = c.replace(/\u597d\u559d/g, '\u597d\u597d\u559d');
                    c = c.replace(/\u5403\u9971/g, '\u6b21\u9971\u9971');
                    c = c.replace(/\u5403\u5b8c\u4e86/g, '\u6b21\u5b8c\u5566');
                    c = c.replace(/\u997f\u4e86/g, '\u809a\u809a\u997f');
                    c = c.replace(/\u809a\u5b50\u997f/g, '\u809a\u809a\u997f');
                    c = c.replace(/\u86cb\u7cd5/g, '\u86cb\u86cb\u7cd5');
                    c = c.replace(/\u7cd6\u679c/g, '\u7cd6\u7cd6');
                    c = c.replace(/\u96f6\u98df/g, '\u96f6\u5634\u5634');
                    c = c.replace(/\u65e9\u9910/g, '\u65e9\u996d\u996d');
                    c = c.replace(/\u5348\u9910/g, '\u5348\u996d\u996d');
                    c = c.replace(/\u665a\u9910/g, '\u665a\u996d\u996d');
                    c = c.replace(/\u6c34\u679c/g, '\u679c\u679c');
                    c = c.replace(/\u725b\u5976/g, '\u725b\u725b');
                    c = c.replace(/\u9762\u5305/g, '\u5305\u5305');
                    c = c.replace(/\u997c\u5e72/g, '\u997c\u997c');
                    c = c.replace(/\u5de7\u514b\u529b/g, '\u5de7\u5de7');
                    c = c.replace(/\u51b0\u6dc7\u6dcb/g, '\u51b0\u51b0');
                    c = c.replace(/\u5976\u8336/g, '\u5976\u5976\u8336');
                    c = c.replace(/\u5496\u5561/g, '\u5496\u5496');
                    c = c.replace(/\u6ce1\u9762/g, '\u6ce1\u6ce1\u9762');
                    c = c.replace(/\u559d\u6c34/g, '\u559d\u6c34\u6c34');
                    c = c.replace(/\u559d\u9152/g, '\u559d\u9152\u9152');
                    c = c.replace(/\u559d\u6c64/g, '\u559d\u6c64\u6c64');
                    c = c.replace(/\u505a\u996d/g, '\u505a\u996d\u996d');
                    c = c.replace(/\u7092\u83dc/g, '\u7092\u7092\u83dc');
                    c = c.replace(/\u716e\u996d/g, '\u716e\u996d\u996d');
                    c = c.replace(/\u5403\u706b\u9505/g, '\u6b21\u706b\u9505\u9505');
                    c = c.replace(/\u5403\u8089/g, '\u6b21\u8089\u8089');
                    c = c.replace(/\u5403\u83dc/g, '\u6b21\u83dc\u83dc');



                    c = c.replace(/\u5f00\u5fc3/g, '\u5f00\u5fc3\u5fc3');
                    c = c.replace(/\u4f24\u5fc3/g, '\u4f24\u5fc3\u5fc3');
                    c = c.replace(/\u5feb\u4e50/g, '\u5feb\u4e50\u4e50');
                    c = c.replace(/\u96be\u8fc7/g, '\u96be\u8fc7\u55b5');
                    c = c.replace(/\u5e78\u798f/g, '\u5e78\u798f\u798f');
                    c = c.replace(/\u5b64\u5355/g, '\u5b64\u5355\u55b5');
                    c = c.replace(/\u65e0\u804a/g, '\u65e0\u804a\u55b5');
                    c = c.replace(/\u597d\u770b/g, '\u597d\u597d\u770b');
                    c = c.replace(/\u597d\u542c/g, '\u597d\u597d\u542c');
                    c = c.replace(/\u597d\u73a9/g, '\u597d\u597d\u73a9');
                    c = c.replace(/\u597d\u7528/g, '\u597d\u597d\u7528');
                    c = c.replace(/\u75bc/g, '\u75bc\u75bc');
                    c = c.replace(/\u75d2/g, '\u75d2\u75d2');
                    c = c.replace(/\u75db/g, '\u75db\u75db');
                    c = c.replace(/\u9178/g, '\u9178\u9178');
                    c = c.replace(/\u9ebb/g, '\u9ebb\u9ebb');
                    c = c.replace(/\u6655/g, '\u6655\u6655');
                    c = c.replace(/\u56f0/g, '\u56f0\u56f0');
                    c = c.replace(/\u6e34/g, '\u6e34\u6e34');
                    c = c.replace(/\u997f/g, '\u997f\u997f');
                    c = c.replace(/\u9971/g, '\u9971\u9971');
                    c = c.replace(/\u7d2f\u6b7b\u4e86/g, '\u7d2f\u7d2f\u6b7b\u5566');
                    c = c.replace(/\u5fd9\u6b7b\u4e86/g, '\u5fd9\u5fd9\u6b7b\u5566');
                    c = c.replace(/\u70e6\u6b7b\u4e86/g, '\u70e6\u70e6\u6b7b\u5566');



                    c = c.replace(/\u7761\u89c9\u89c9/g, '\u788e\u89c9\u89c9');
                    c = c.replace(/\u788e\u89c9/g, '\u788e\u89c9\u89c9');
                    c = c.replace(/\u56f0\u4e86/g, '\u56f0\u56f0\u5566');
                    c = c.replace(/\u7d2f/g, '\u7d2f\u7d2f\u54d2');
                    c = c.replace(/\u7761\u4e86/g, '\u788e\u5566');
                    c = c.replace(/\u7761\u9192/g, '\u788e\u9192\u5566');
                    c = c.replace(/\u505a\u68a6/g, '\u505a\u840c\u840c\u68a6');
                    c = c.replace(/\u778c\u7761/g, '\u778c\u7761\u55b5');
                    c = c.replace(/\u71ac\u591c/g, '\u71ac\u55b5\u591c');
                    c = c.replace(/\u5931\u7720/g, '\u5931\u7720\u55b5');
                    c = c.replace(/\u4f11\u606f/g, '\u4f11\u606f\u55b5');
                    c = c.replace(/\u8eba\u4e0b/g, '\u8eba\u8eba\u55b5');
                    c = c.replace(/\u6253\u54c8\u6b20/g, '\u6253\u54c8\u6b20\u55b5');
                    c = c.replace(/\u8d77\u5e8a/g, '\u8d77\u5e8a\u55b5');
                    c = c.replace(/\u9192\u6765/g, '\u9192\u6765\u55b5');
                    c = c.replace(/\u7761\u5348\u89c9/g, '\u788e\u5348\u89c9\u89c9');
                    c = c.replace(/\u7761\u61d2\u89c9/g, '\u788e\u61d2\u89c9\u89c9');



                    c = c.replace(/\u55b5\u55b5/g, '\u55b5\u55b5');
                    c = c.replace(/\u597d\u55b5/g, '\u597d\u55b5');
                    c = c.replace(/\u662f\u55b5/g, '\u7d20\u55b5');
                    c = c.replace(/\u8981\u55b5/g, '\u8981\u55b5');
                    c = c.replace(/\u53bb\u55b5/g, '\u53bb\u55b5');
                    c = c.replace(/\u6765\u55b5/g, '\u6765\u55b5');
                    c = c.replace(/\u732b\u732b/g, '\u732b\u9171');
                    c = c.replace(/\u5c0f\u732b/g, '\u5c0f\u732b\u54aa');
                    c = c.replace(/\u732b\u54aa/g, '\u732b\u9171');
                    c = c.replace(/\u771f\u7684\u55b5/g, '\u771f\u54d2\u55b5');
                    c = c.replace(/\u662f\u7684\u55b5/g, '\u7d20\u54d2\u55b5');
                    c = c.replace(/\u55b5\u53eb/g, '\u55b5\u55b5\u53eb');
                    c = c.replace(/\u55b5\u545c/g, '\u55b5\u545c~');
                    c = c.replace(/\u547c\u55b5/g, '\u547c\u55b5~');
                    c = c.replace(/\u54aa\u55b5/g, '\u54aa\u55b5~');
                    c = c.replace(/\u5438\u732b/g, '\u5438\u732b\u9171~');
                    c = c.replace(/\u64b8\u732b/g, '\u64b8\u732b\u9171');
                    c = c.replace(/\u732b\u5974/g, '\u55b5\u5974');
                    c = c.replace(/\u94f2\u5c4e/g, '\u94f2\u55b5\u5c4e');
                    c = c.replace(/\u72d7\u52fe/g, '\u72d7\u52fe');
                    c = c.replace(/\u5154\u53fd/g, '\u5c0f\u5154\u53fd');
                    c = c.replace(/\u718a\u718a/g, '\u718a\u718a');
                    c = c.replace(/\u732a\u732a/g, '\u732a\u732a');
                    c = c.replace(/\u9f20\u9f20/g, '\u9f20\u9f20');



                    c = c.replace(/\u4eba\u5bb6/g, '\u4eba\u5bb6');
                    c = c.replace(/\u6492\u5a07/g, '\u6492\u4e2a\u5a07\u5a07');
                    c = c.replace(/\u4eb2\u4eb2/g, '\u4eb2\u4eb2');
                    c = c.replace(/\u6478\u6478/g, '\u6478\u6478\u5934');
                    c = c.replace(/\u73a9\u73a9/g, '\u73a9\u73a9\u54d2');
                    c = c.replace(/\u5e2e\u5fd9/g, '\u5e2e\u5e2e\u5fd9');
                    c = c.replace(/\u544a\u8bc9/g, '\u544a\u8bc9\u544a\u8bc9');
                    c = c.replace(/\u4e00\u4e0b/g, '\u4e00\u4e0b\u5b50');
                    c = c.replace(/\u4e00\u70b9\u513f/g, '\u4e00\u4e22\u4e22');
                    c = c.replace(/\u4e00\u70b9\u70b9/g, '\u4e00\u4e22\u4e22');
                    c = c.replace(/\u591a\u4e00\u4e9b/g, '\u591a\u4e00\u4e22\u4e22');
                    c = c.replace(/\u4e00\u4f1a\u513f/g, '\u4e00\u5c0f\u4f1a\u513f');
                    c = c.replace(/\u4e00\u8d77/g, '\u4e00\u8d77\u8d77');
                    c = c.replace(/\u4e00\u4e2a\u4eba/g, '\u4e00\u4e2a\u4eba\u5bb6');
                    c = c.replace(/\u5927\u5bb6/g, '\u5927\u5bb6\u4f19');
                    c = c.replace(/\u7cd6\u7cd6/g, '\u7cd6\u7cd6');
                    c = c.replace(/\u679c\u679c/g, '\u679c\u679c');
                    c = c.replace(/\u978b\u978b/g, '\u978b\u978b');
                    c = c.replace(/\u8863\u8863/g, '\u8863\u8863');
                    c = c.replace(/\u889c\u889c/g, '\u889c\u889c');
                    c = c.replace(/\u5e3d\u5e3d/g, '\u5e3d\u5e3d');
                    c = c.replace(/\u88e4\u88e4/g, '\u88e4\u88e4');
                    c = c.replace(/\u624b\u624b/g, '\u624b\u624b');
                    c = c.replace(/\u811a\u811a/g, '\u811a\u811a');
                    c = c.replace(/\u753b\u753b/g, '\u753b\u753b\u753b');
                    c = c.replace(/\u5199\u5b57/g, '\u5199\u5199\u5b57');
                    c = c.replace(/\u8bfb\u4e66/g, '\u8bfb\u8bfb\u4e66');
                    c = c.replace(/\u505a\u4f5c\u4e1a/g, '\u505a\u4f5c\u4e1a\u4e1a');
                    c = c.replace(/\u5199\u4f5c\u4e1a/g, '\u5199\u4f5c\u4e1a\u4e1a');



                    c = c.replace(/\u786e\u5b9e/g, '\u786e\u5b9e\u634f');
                    c = c.replace(/\u5f53\u7136/g, '\u5f53\u7136\u5566');
                    c = c.replace(/\u6ca1\u9519/g, '\u6ca1\u9519\u55b5');
                    c = c.replace(/\u653e\u5fc3/g, '\u653e\u5fc3\u5566');
                    c = c.replace(/\u771f\u7684\u5417/g, '\u771f\u54d2\u561b');
                    c = c.replace(/\u662f\u5417/g, '\u7d20\u561b');
                    c = c.replace(/\u5bf9\u5417/g, '\u5bf9\u561b');
                    c = c.replace(/\u884c\u5417/g, '\u884c\u561b');
                    c = c.replace(/\u53ef\u4ee5\u5417/g, '\u9614\u4ee5\u561b');
                    c = c.replace(/\u597d\u5427/g, '\u597d\u53ed');
                    c = c.replace(/\u597d\u7684/g, '\u597d\u54d2');
                    c = c.replace(/\u5fc5\u987b/g, '\u5fc5\u987b\u55b5');
                    c = c.replace(/\u7edd\u5bf9/g, '\u7edd\u5bf9\u54d2');
                    c = c.replace(/\u5b8c\u5168/g, '\u5b8c\u5168\u54d2');
                    c = c.replace(/\u8d85\u7ea7/g, '\u8d85\u7ea7\u55b5');
                    c = c.replace(/\u80af\u5b9a/g, '\u80af\u5b9a\u54d2');
                    c = c.replace(/\u6ca1\u9519\u6ca1\u9519/g, '\u6ca1\u9519\u6ca1\u9519');
                    c = c.replace(/\u5bf9\u554a\u5bf9\u554a/g, '\u5bf9\u554a\u5bf9\u554a');
                    c = c.replace(/\u5c31\u662f\u5c31\u662f/g, '\u5c31\u662f\u5c31\u662f');
                    c = c.replace(/\u786e\u5b9e\u786e\u5b9e/g, '\u786e\u5b9e\u786e\u5b9e');
                    c = c.replace(/\u5f53\u7136\u5f53\u7136/g, '\u5f53\u7136\u5f53\u7136');



                    c = c.replace(/\u5728\u54ea\u91cc/g, '\u5728\u54ea\u634f');
                    c = c.replace(/\u662f\u4ec0\u4e48/g, '\u7d20\u4ec0\u4e48\u634f');
                    c = c.replace(/\u600e\u4e48\u6837/g, '\u80bf\u4e48\u6837\u634f');
                    c = c.replace(/\u4e3a\u4ec0\u4e48/g, '\u4e3a\u795e\u9a6c\u634f');
                    c = c.replace(/\u8c01/g, '\u8c01\u5440');
                    c = c.replace(/\u54ea\u4e2a/g, '\u54ea\u4e2a\u55b5');
                    c = c.replace(/\u54ea\u91cc/g, '\u54ea\u91cc\u55b5');
                    c = c.replace(/\u54ea\u513f/g, '\u54ea\u513f\u55b5');
                    c = c.replace(/\u5e72\u561b/g, '\u5e72\u561b\u9e2d');
                    c = c.replace(/\u5e72\u5565/g, '\u5e72\u5565\u55b5');
                    c = c.replace(/\u4ec0\u4e48\u65f6\u5019/g, '\u795e\u9a6c\u65f6\u5019');
                    c = c.replace(/\u591a\u4e45/g, '\u591a\u4e45\u55b5');
                    c = c.replace(/\u600e\u4e48\u5566/g, '\u80bf\u4e48\u5566');
                    c = c.replace(/\u600e\u4e48\u529e/g, '\u80bf\u4e48\u529e\u55b5');
                    c = c.replace(/\u600e\u4e48\u56de\u4e8b/g, '\u80bf\u4e48\u56de\u4e8b\u55b5');
                    c = c.replace(/\u505a\u4ec0\u4e48/g, '\u505a\u795e\u9a6c');
                    c = c.replace(/\u4e70\u4ec0\u4e48/g, '\u4e70\u795e\u9a6c');
                    c = c.replace(/\u8bf4\u4ec0\u4e48/g, '\u8bf4\u795e\u9a6c');
                    c = c.replace(/\u60f3\u4ec0\u4e48/g, '\u60f3\u795e\u9a6c');
                    c = c.replace(/\u770b\u4ec0\u4e48/g, '\u770b\u795e\u9a6c');
                    c = c.replace(/\u5403\u4ec0\u4e48/g, '\u6b21\u795e\u9a6c');
                    c = c.replace(/\u559d\u4ec0\u4e48/g, '\u559d\u795e\u9a6c');
                    c = c.replace(/\u73a9\u4ec0\u4e48/g, '\u73a9\u795e\u9a6c');



                    c = c.replace(/\u7136\u540e/g, '\u7136\u540e\u634f');
                    c = c.replace(/\u6240\u4ee5/g, '\u6240\u4ee5\u5462');
                    c = c.replace(/\u4e0d\u8fc7\u4e86/g, '\u4e0d\u8fc7\u5566');
                    c = c.replace(/\u800c\u4e14/g, '\u800c\u4e14\u55b5');
                    c = c.replace(/\u53ea\u662f/g, '\u53ea\u4e0d\u8fc7\u5566');
                    c = c.replace(/\u4f46\u662f/g, '\u4f46\u7d20\u55b5');
                    c = c.replace(/\u7ed3\u679c/g, '\u7ed3\u679c\u55b5');
                    c = c.replace(/\u867d\u7136/g, '\u867d\u7136\u55b5');
                    c = c.replace(/\u5982\u679c/g, '\u5982\u679c\u55b5');
                    c = c.replace(/\u90a3\u4e48/g, '\u90a3\u55b5');
                    c = c.replace(/\u8981\u4e48/g, '\u8981\u4e48\u55b5');
                    c = c.replace(/\u6216\u8005/g, '\u6216\u8005\u55b5');
                    c = c.replace(/\u4e8e\u662f/g, '\u4e8e\u7d20');
                    c = c.replace(/\u53cd\u6b63/g, '\u53cd\u6b63\u55b5');
                    c = c.replace(/\u6bd5\u7adf/g, '\u6bd5\u7adf\u55b5');
                    c = c.replace(/\u5230\u5e95/g, '\u5230\u5e95\u55b5');
                    c = c.replace(/\u7a76\u7adf/g, '\u7a76\u7adf\u55b5');
                    c = c.replace(/\u539f\u6765/g, '\u539f\u6765\u9171');
                    c = c.replace(/\u96be\u602a/g, '\u96be\u602a\u55b5');
                    c = c.replace(/\u603b\u4e4b/g, '\u603b\u4e4b\u55b5');
                    c = c.replace(/\u6362\u53e5\u8bdd\u8bf4/g, '\u6362\u53e5\u8bdd\u8bf4\u55b5');
                    c = c.replace(/\u4e5f\u5c31\u662f\u8bf4/g, '\u4e5f\u5c31\u662f\u8bf4\u55b5');
                    c = c.replace(/\u5c3d\u7ba1\u5982\u6b64/g, '\u5c3d\u7ba1\u5982\u6b64\u55b5');
                    c = c.replace(/\u65e0\u8bba\u5982\u4f55/g, '\u65e0\u8bba\u5982\u4f55\u55b5');
                    c = c.replace(/\u603b\u7684\u6765\u8bf4/g, '\u603b\u7684\u6765\u8bf4\u55b5');



                    c = c.replace(/\u6f02\u4eae/g, '\u6f02\u917f');
                    c = c.replace(/\u7f8e\u4e3d/g, '\u7f8e\u7f8e\u54d2');
                    c = c.replace(/\u5e05/g, '\u5e05\u5e05\u54d2');
                    c = c.replace(/\u806a\u660e/g, '\u806a\u660e\u54d2');
                    c = c.replace(/\u6e29\u67d4/g, '\u6e29\u67d4\u54d2');
                    c = c.replace(/\u5584\u826f/g, '\u5584\u826f\u54d2');
                    c = c.replace(/\u52aa\u529b/g, '\u52aa\u529b\u54d2');
                    c = c.replace(/\u8ba4\u771f/g, '\u8ba4\u771f\u54d2');
                    c = c.replace(/\u6d3b\u6cfc/g, '\u6d3b\u6cfc\u54d2');
                    c = c.replace(/\u5927\u65b9/g, '\u5927\u65b9\u54d2');
                    c = c.replace(/\u4f53\u8d34/g, '\u4f53\u8d34\u54d2');
                    c = c.replace(/\u7ec6\u5fc3/g, '\u7ec6\u5fc3\u54d2');
                    c = c.replace(/\u8010\u5fc3/g, '\u8010\u5fc3\u54d2');
                    c = c.replace(/\u52c7\u6562/g, '\u52c7\u6562\u54d2');
                    c = c.replace(/\u575a\u5f3a/g, '\u575a\u5f3a\u54d2');
                    c = c.replace(/\u4e50\u89c2/g, '\u4e50\u89c2\u54d2');
                    c = c.replace(/\u5f00\u6717/g, '\u5f00\u6717\u54d2');
                    c = c.replace(/\u4f18\u79c0/g, '\u4f18\u79c0\u54d2');
                    c = c.replace(/\u987a\u5229/g, '\u987a\u5229\u55b5');
                    c = c.replace(/\u6e29\u6696/g, '\u6696\u547c\u547c');



                    c = c.replace(/\u54c8\u54c8\u54c8/g, '\u5657\u54c8\u54c8\u54c8');
                    c = c.replace(/\u7b11\u6b7b/g, '\u7b11\u6b7b\u55b5');
                    c = c.replace(/\u597d\u60f3/g, '\u597d\u60f3\u597d\u60f3');
                    c = c.replace(/\u597d\u559c\u6b22/g, '\u6572\u559c\u6b22');
                    c = c.replace(/\u597d\u65e0\u804a/g, '\u597d\u65e0\u804a\u55b5');
                    c = c.replace(/\u597d\u7d2f/g, '\u597d\u7d2f\u7d2f');
                    c = c.replace(/\u597d\u6c14/g, '\u597d\u6c14\u55b5');
                    c = c.replace(/\u597d\u96be/g, '\u597d\u96be\u55b5');
                    c = c.replace(/\u597d\u70e6/g, '\u597d\u70e6\u55b5');
                    c = c.replace(/\u597d\u68d2/g, '\u7092\u9e21\u68d2');
                    c = c.replace(/\u597d\u5f3a/g, '\u7092\u9e21\u5f3a');
                    c = c.replace(/\u597d\u5feb/g, '\u597d\u5feb\u5feb');
                    c = c.replace(/\u597d\u6162/g, '\u597d\u6162\u6162');
                    c = c.replace(/\u597d\u5927/g, '\u597d\u5927\u5927');
                    c = c.replace(/\u597d\u5c0f/g, '\u597d\u5c0f\u5c0f');
                    c = c.replace(/\u597d\u591a/g, '\u597d\u597d\u591a');
                    c = c.replace(/\u597d\u5c11/g, '\u597d\u5c11\u5c11');
                    c = c.replace(/\u597d\u4eba/g, '\u597d\u55b5\u4eba');
                    c = c.replace(/\u597d\u4e8b/g, '\u597d\u55b5\u4e8b');
                    c = c.replace(/\u597d\u8fd0/g, '\u597d\u8fd0\u55b5');
                    c = c.replace(/\u5e78\u597d/g, '\u5e78\u597d\u55b5');
                    c = c.replace(/\u8fd8\u597d/g, '\u8fd8\u597d\u55b5');
                    c = c.replace(/\u592a\u597d/g, '\u592a\u597d\u5566');
                    c = c.replace(/\u771f\u662f\u7684/g, '\u771f\u7d20\u54d2');



                    c = c.replace(/\u592a\u9633/g, '\u592a\u9633\u516c\u516c');
                    c = c.replace(/\u6708\u4eae/g, '\u6708\u4eae\u59d0\u59d0');
                    c = c.replace(/\u661f\u661f/g, '\u5c0f\u661f\u661f');
                    c = c.replace(/\u4e91\u4e91/g, '\u4e91\u4e91');
                    c = c.replace(/\u4e0b\u96e8/g, '\u4e0b\u96e8\u5566');
                    c = c.replace(/\u4e0b\u96ea/g, '\u4e0b\u96ea\u5566');
                    c = c.replace(/\u522e\u98ce/g, '\u522e\u98ce\u55b5');
                    c = c.replace(/\u6253\u96f7/g, '\u6253\u96f7\u55b5');
                    c = c.replace(/\u95ea\u7535/g, '\u95ea\u7535\u55b5');
                    c = c.replace(/\u6674\u5929/g, '\u6674\u5929\u55b5');
                    c = c.replace(/\u9634\u5929/g, '\u9634\u5929\u55b5');
                    c = c.replace(/\u96e8\u5929/g, '\u96e8\u5929\u55b5');
                    c = c.replace(/\u96ea\u5929/g, '\u96ea\u5929\u55b5');
                    c = c.replace(/\u6625\u5929/g, '\u6625\u5929\u55b5');
                    c = c.replace(/\u590f\u5929/g, '\u590f\u5929\u55b5');
                    c = c.replace(/\u79cb\u5929/g, '\u79cb\u5929\u55b5');
                    c = c.replace(/\u51ac\u5929/g, '\u51ac\u5929\u55b5');
                    c = c.replace(/\u597d\u5929\u6c14/g, '\u597d\u5929\u6c14\u55b5');
                    c = c.replace(/\u597d\u51b7/g, '\u597d\u51b7\u51b7');
                    c = c.replace(/\u597d\u70ed/g, '\u597d\u70ed\u70ed');
                    c = c.replace(/\u597d\u6696/g, '\u597d\u6696\u6696');
                    c = c.replace(/\u597d\u51c9/g, '\u597d\u51c9\u51c9');



                    c = c.replace(/\u5de5\u4f5c/g, '\u5de5\u4f5c\u55b5');
                    c = c.replace(/\u4e0a\u73ed/g, '\u4e0a\u73ed\u55b5');
                    c = c.replace(/\u4e0b\u73ed/g, '\u4e0b\u73ed\u5566');
                    c = c.replace(/\u52a0\u73ed/g, '\u52a0\u73ed\u55b5');
                    c = c.replace(/\u8bf7\u5047/g, '\u8bf7\u5047\u55b5');
                    c = c.replace(/\u5b66\u4e60/g, '\u5b66\u4e60\u55b5');
                    c = c.replace(/\u4e0a\u8bfe/g, '\u4e0a\u8bfe\u55b5');
                    c = c.replace(/\u4e0b\u8bfe/g, '\u4e0b\u8bfe\u5566');
                    c = c.replace(/\u8003\u8bd5/g, '\u8003\u8bd5\u55b5');
                    c = c.replace(/\u590d\u4e60/g, '\u590d\u4e60\u55b5');
                    c = c.replace(/\u9884\u4e60/g, '\u9884\u4e60\u55b5');
                    c = c.replace(/\u4f5c\u4e1a/g, '\u4f5c\u4e1a\u55b5');
                    c = c.replace(/\u8003\u8bd5\u52a0\u6cb9/g, '\u8003\u8bd5\u52a0\u6cb9\u55b5');
                    c = c.replace(/\u6bd5\u4e1a/g, '\u6bd5\u4e1a\u5566');
                    c = c.replace(/\u653e\u5047/g, '\u653e\u5047\u5566');
                    c = c.replace(/\u5f00\u5b66/g, '\u5f00\u5b66\u55b5');



                    c = c.replace(/\u52a0\u6cb9/g, '\u52a0\u6cb9\u55b5');
                    c = c.replace(/\u575a\u6301/g, '\u575a\u6301\u55b5');
                    c = c.replace(/\u522b\u6015/g, '\u522b\u6015\u55b5');
                    c = c.replace(/\u522b\u54ed/g, '\u522b\u54ed\u55b5');
                    c = c.replace(/\u522b\u6025/g, '\u522b\u6025\u55b5');
                    c = c.replace(/\u522b\u614c/g, '\u522b\u614c\u55b5');
                    c = c.replace(/\u522b\u62c5\u5fc3/g, '\u522b\u62c5\u5fc3\u55b5');
                    c = c.replace(/\u4e00\u5b9a\u80fd/g, '\u4e00\u5b9a\u80fd\u54d2');
                    c = c.replace(/\u4e00\u5b9a\u53ef\u4ee5/g, '\u4e00\u5b9a\u9614\u4ee5\u54d2');
                    c = c.replace(/\u6ca1\u95ee\u9898/g, '\u6ca1\u95ee\u9898\u54d2');
                    c = c.replace(/\u6ca1\u4e8b\u7684/g, '\u6ca1\u4e8b\u54d2');
                    c = c.replace(/\u653e\u5fc3\u5427/g, '\u653e\u5fc3\u54d2\u55b5');
                    c = c.replace(/\u4e0d\u6015/g, '\u4e0d\u6015\u55b5');
                    c = c.replace(/\u52a0\u6cb9\u7684\u8bf4/g, '\u52a0\u6cb9\u54d2');
                    c = c.replace(/\u53ef\u4ee5\u7684/g, '\u9614\u4ee5\u54d2');
                    c = c.replace(/\u597d\u7684/g, '\u597d\u54d2');
                    c = c.replace(/\u6700\u68d2/g, '\u7092\u9e21\u68d2');
                    c = c.replace(/\u76f8\u4fe1/g, '\u76f8\u4fe1\u55b5');



                    c = c.replace(/\u5934\u75bc/g, '\u5934\u75bc\u55b5');
                    c = c.replace(/\u809a\u5b50\u75bc/g, '\u809a\u809a\u75bc');
                    c = c.replace(/\u7259\u75bc/g, '\u7259\u75bc\u55b5');
                    c = c.replace(/\u55d3\u5b50\u75bc/g, '\u55d3\u5b50\u75bc\u55b5');
                    c = c.replace(/\u53d1\u70e7/g, '\u53d1\u70e7\u55b5');
                    c = c.replace(/\u611f\u5192/g, '\u611f\u5192\u55b5');
                    c = c.replace(/\u54b3\u55fd/g, '\u54b3\u54b3');
                    c = c.replace(/\u6d41\u9f3b\u6d95/g, '\u6d41\u9f3b\u6d95\u55b5');
                    c = c.replace(/\u5403\u836f/g, '\u6b21\u836f\u55b5');
                    c = c.replace(/\u6253\u9488/g, '\u6253\u9488\u9488');
                    c = c.replace(/\u53bb\u533b\u9662/g, '\u53bb\u533b\u533b\u9662');
                    c = c.replace(/\u4e0d\u8212\u670d/g, '\u4e0d\u8212\u670d\u55b5');
                    c = c.replace(/\u751f\u75c5/g, '\u751f\u75c5\u55b5');
                    c = c.replace(/\u53d7\u4f24/g, '\u53d7\u4f24\u55b5');



                    c = c.replace(/\u597d\u6f02\u4eae/g, '\u597d\u6f02\u917f');
                    c = c.replace(/\u597d\u597d\u770b/g, '\u8d85\u597d\u770b\u54d2');
                    c = c.replace(/\u771f\u597d\u770b/g, '\u771f\u54d2\u597d\u597d\u770b');
                    c = c.replace(/\u592a\u68d2\u4e86/g, '\u7092\u9e21\u68d2\u5566');
                    c = c.replace(/\u592a\u5389\u5bb3\u4e86/g, '\u7092\u9e21\u5389\u5bb3\u5566');
                    c = c.replace(/\u592a\u597d\u4e86/g, '\u592a\u597d\u5566');
                    c = c.replace(/\u771f\u5389\u5bb3/g, '\u771f\u54d2\u5389\u5bb3\u55b5');
                    c = c.replace(/\u771f\u68d2/g, '\u771f\u54d2\u68d2\u55b5');
                    c = c.replace(/\u5389\u5bb3\u5389\u5bb3/g, '\u5389\u5bb3\u5389\u5bb3\u55b5');
                    c = c.replace(/\u68d2\u68d2/g, '\u68d2\u68d2\u54d2');
                    c = c.replace(/\u597d\u4e56/g, '\u597d\u4e56\u4e56');
                    c = c.replace(/\u771f\u4e56/g, '\u771f\u4e56\u4e56');
                    c = c.replace(/\u597d\u542c\u8bdd/g, '\u597d\u542c\u8bdd\u55b5');
                    c = c.replace(/\u505a\u5f97\u597d/g, '\u505a\u5f97\u597d\u597d');



                    c = c.replace(/\u5e0c\u671b/g, '\u5e0c\u671b\u55b5');
                    c = c.replace(/\u795d\u613f/g, '\u795d\u613f\u55b5');
                    c = c.replace(/\u68a6\u60f3/g, '\u68a6\u60f3\u55b5');
                    c = c.replace(/\u5fc3\u60f3\u4e8b\u6210/g, '\u5fc3\u60f3\u4e8b\u6210\u55b5');
                    c = c.replace(/\u4e07\u4e8b\u5982\u610f/g, '\u4e07\u4e8b\u5982\u610f\u55b5');
                    c = c.replace(/\u751f\u65e5\u5feb\u4e50/g, '\u751f\u65e5\u5feb\u4e50\u55b5');
                    c = c.replace(/\u65b0\u5e74\u5feb\u4e50/g, '\u65b0\u5e74\u5feb\u4e50\u55b5');
                    c = c.replace(/\u8282\u65e5\u5feb\u4e50/g, '\u8282\u65e5\u5feb\u4e50\u55b5');
                    c = c.replace(/\u5723\u8bde\u8282/g, '\u5723\u8bde\u8282\u55b5');
                    c = c.replace(/\u65b0\u5e74/g, '\u65b0\u5e74\u55b5');
                    c = c.replace(/\u8fc7\u5e74/g, '\u8fc7\u5e74\u55b5');



                    c = c.replace(/\u53eb\u6211/g, '\u53eb\u54b1');
                    c = c.replace(/\u53eb\u4f60/g, '\u53eb\u4e43');
                    c = c.replace(/\u558a\u6211/g, '\u558a\u54b1');
                    c = c.replace(/\u558a\u4f60/g, '\u558a\u4e43');
                    c = c.replace(/\u627e\u6211/g, '\u627e\u54b1');
                    c = c.replace(/\u627e\u4f60/g, '\u627e\u4e43');
                    c = c.replace(/\u7b49\u6211/g, '\u7b49\u7b49\u54b1');
                    c = c.replace(/\u7b49\u4f60/g, '\u7b49\u7b49\u4e43');
                    c = c.replace(/\u5e2e\u6211/g, '\u5e2e\u5e2e\u54b1');
                    c = c.replace(/\u5e2e\u4f60/g, '\u5e2e\u5e2e\u4e43');
                    c = c.replace(/\u8ba9\u6211/g, '\u8ba9\u54b1');
                    c = c.replace(/\u8ba9\u4f60/g, '\u8ba9\u4e43');
                    c = c.replace(/\u7ed9\u6211/g, '\u7ed9\u54b1');
                    c = c.replace(/\u7ed9\u4f60/g, '\u7ed9\u4e43');
                    c = c.replace(/\u5bf9\u4f60\u8bf4/g, '\u5bf9\u4e43\u8bf4');
                    c = c.replace(/\u542c\u6211\u8bf4/g, '\u542c\u54b1\u8bf4');
                    c = c.replace(/\u542c\u4f60\u8bf4/g, '\u542c\u4e43\u8bf4');
                    c = c.replace(/\u60f3\u6211/g, '\u60f3\u54b1');
                    c = c.replace(/\u60f3\u4f60/g, '\u60f3\u4e43');



                    c = c.replace(/\u597d\u4e0d\u597d\u561b/g, '\u597d\u4e0d\u5566');
                    c = c.replace(/\u884c\u4e0d\u884c\u561b/g, '\u884c\u4e0d\u5566');
                    c = c.replace(/\u53ef\u4e0d\u53ef\u4ee5\u561b/g, '\u9614\u4e0d\u9614\u4ee5\u561b');
                    c = c.replace(/\u8981\u4e0d\u8981\u561b/g, '\u8981\u4e0d\u8981\u561b');
                    c = c.replace(/\u7ed9\u6211\u561b/g, '\u7ed9\u54b1\u561b');
                    c = c.replace(/\u6765\u561b/g, '\u6765\u561b~');
                    c = c.replace(/\u53bb\u561b/g, '\u53bb\u561b~');
                    c = c.replace(/\u8981\u561b/g, '\u8981\u561b~');
                    c = c.replace(/\u6c42\u6c42/g, '\u6c42\u6c42\u4f60\u5566');
                    c = c.replace(/\u62dc\u6258/g, '\u62dc\u6258\u62dc\u6258');
                    c = c.replace(/\u62dc\u6258\u5566/g, '\u62dc\u6258\u62dc\u6258');
                    c = c.replace(/\u6492\u5a07/g, '\u6492\u4e2a\u5a07\u5a07');
                    c = c.replace(/\u8981\u62b1\u62b1/g, '\u8981\u62b1\u62b1');
                    c = c.replace(/\u8981\u4eb2\u4eb2/g, '\u8981\u4eb2\u4eb2');
                    c = c.replace(/\u8981\u4e3e\u9ad8\u9ad8/g, '\u8981\u4e3e\u9ad8\u9ad8');
                    c = c.replace(/\u8981\u8d34\u8d34/g, '\u8981\u8d34\u8d34');
                    c = c.replace(/\u54c4\u6211/g, '\u54c4\u54c4\u54b1');
                    c = c.replace(/\u966a\u6211/g, '\u966a\u966a\u54b1');
                    c = c.replace(/\u5ba0\u6211/g, '\u5ba0\u5ba0\u54b1');



                    c = c.replace(/\u653e(\u4e0b|\u90a3)/, '\u653e\u653e$1');
                    c = c.replace(/\u62ff(\u8d77|\u8d70)/g, '\u62ff\u62ff$1');
                    c = c.replace(/\u62c9(\u7740|\u8d70)/g, '\u62c9\u62c9$1');
                    c = c.replace(/\u63a8(\u5f00|\u8d70)/g, '\u63a8\u63a8$1');
                    c = c.replace(/\u6572(\u95e8|\u6253)/g, '\u6572\u6572$1');
                    c = c.replace(/\u62cd(\u62cd|\u6211|\u4f60)/g, '\u62cd\u62cd$1');
                    c = c.replace(/\u6478(\u6478|\u5934|\u732b|\u72d7)/g, '\u6478\u6478$1');
                    c = c.replace(/\u63c9(\u63c9|\u8138|\u773c)/g, '\u63c9\u63c9$1');
                    c = c.replace(/\u634f(\u634f|\u8138|\u624b)/g, '\u634f\u634f$1');
                    c = c.replace(/\u8e6d\u8e6d/g, '\u8e6d\u8e6d');
                    c = c.replace(/\u6447(\u6447|\u5934|\u624b)/g, '\u6447\u6447$1');
                    c = c.replace(/\u70b9(\u70b9|\u5934)/g, '\u70b9\u70b9\u5934');
                    c = c.replace(/\u8e72\u4e0b/g, '\u8e72\u8e72');
                    c = c.replace(/\u7ad9\u8d77\u6765/g, '\u7ad9\u7ad9');
                    c = c.replace(/\u5750(\u4e0b|\u7740)/g, '\u5750\u5750$1');
                    c = c.replace(/\u8eba(\u4e0b|\u7740)/g, '\u8eba\u8eba$1');
                    c = c.replace(/\u8db4(\u4e0b|\u7740)/g, '\u8db4\u8db4$1');
                    c = c.replace(/\u8f6c(\u8eab|\u5708)/g, '\u8f6c\u8f6c$1');



                    c = c.replace(/\u8fd9\u91cc/g, '\u8fd9\u7406');
                    c = c.replace(/\u90a3\u91cc/g, '\u90a3\u91cc\u55b5');
                    c = c.replace(/\u54ea\u91cc/g, '\u54ea\u91cc\u55b5');
                    c = c.replace(/\u54ea\u513f/g, '\u54ea\u513f\u55b5');
                    c = c.replace(/\u4e0a\u9762/g, '\u4e0a\u9762\u55b5');
                    c = c.replace(/\u4e0b\u9762/g, '\u4e0b\u9762\u55b5');
                    c = c.replace(/\u91cc\u9762/g, '\u91cc\u9762\u55b5');
                    c = c.replace(/\u5916\u9762/g, '\u5916\u9762\u55b5');
                    c = c.replace(/\u524d\u9762/g, '\u524d\u9762\u55b5');
                    c = c.replace(/\u540e\u9762/g, '\u540e\u9762\u55b5');
                    c = c.replace(/\u5de6\u8fb9/g, '\u5de6\u8fb9\u55b5');
                    c = c.replace(/\u53f3\u8fb9/g, '\u53f3\u8fb9\u55b5');
                    c = c.replace(/\u65c1\u8fb9/g, '\u65c1\u8fb9\u55b5');
                    c = c.replace(/\u5bf9\u9762/g, '\u5bf9\u9762\u55b5');
                    c = c.replace(/\u4e2d\u95f4/g, '\u4e2d\u95f4\u55b5');
                    c = c.replace(/\u5bb6\u91cc/g, '\u7a9d\u91cc');
                    c = c.replace(/\u5b66\u6821/g, '\u5b66\u5802');
                    c = c.replace(/\u516c\u53f8/g, '\u516c\u53f8\u55b5');
                    c = c.replace(/\u8def\u4e0a/g, '\u8def\u4e0a\u55b5');
                    c = c.replace(/\u697c\u4e0b/g, '\u697c\u4e0b\u55b5');



                    c = c.replace(/\u7ea2\u8272/g, '\u7ea2\u7ea2\u6ef4');
                    c = c.replace(/\u7c89\u8272/g, '\u7c89\u7c89\u6ef4');
                    c = c.replace(/\u84dd\u8272/g, '\u84dd\u84dd\u6ef4');
                    c = c.replace(/\u7eff\u8272/g, '\u7eff\u7eff\u6ef4');
                    c = c.replace(/\u9ec4\u8272/g, '\u9ec4\u9ec4\u6ef4');
                    c = c.replace(/\u767d\u8272/g, '\u767d\u767d\u6ef4');
                    c = c.replace(/\u9ed1\u8272/g, '\u9ed1\u9ed1\u6ef4');
                    c = c.replace(/\u7d2b\u8272/g, '\u7d2b\u7d2b\u6ef4');
                    c = c.replace(/\u5f69\u8272/g, '\u5f69\u5f69\u6ef4');
                    c = c.replace(/\u597d\u770b/g, '\u597d\u597d\u770b');
                    c = c.replace(/\u6f02\u4eae/g, '\u6f02\u6f02\u917f');
                    c = c.replace(/\u53ef\u7231/g, '\u9614\u9614\u7231');
                    c = c.replace(/\u5e05\u6c14/g, '\u5e05\u5e05\u6c14');
                    c = c.replace(/\u7f8e\u4e3d/g, '\u7f8e\u7f8e\u4e3d');
                    c = c.replace(/\u9ad8\u5927/g, '\u9ad8\u9ad8\u5927');
                    c = c.replace(/\u77ee\u5c0f/g, '\u77ee\u77ee\u5c0f');
                    c = c.replace(/\u80d6/g, '\u80d6\u80d6');
                    c = c.replace(/\u7626/g, '\u7626\u7626');



                    c = c.replace(/\u6d3b\u6cfc/g, '\u6d3b\u6cfc\u6cfc');
                    c = c.replace(/\u5f00\u6717/g, '\u5f00\u6717\u6717');
                    c = c.replace(/\u5927\u65b9/g, '\u5927\u65b9\u65b9');
                    c = c.replace(/\u6177\u6168/g, '\u6177\u6168\u6168');
                    c = c.replace(/\u70ed\u60c5/g, '\u70ed\u60c5\u60c5');
                    c = c.replace(/\u51b7\u6f20/g, '\u51b7\u6f20\u6f20');
                    c = c.replace(/\u6e29\u67d4/g, '\u67d4\u67d4');
                    c = c.replace(/\u66b4\u8e81/g, '\u66b4\u8e81\u8e81');
                    c = c.replace(/\u56fa\u6267/g, '\u56fa\u6267\u6267');
                    c = c.replace(/\u4efb\u6027/g, '\u4efb\u6027\u6027');
                    c = c.replace(/\u8c03\u76ae/g, '\u8c03\u8c03\u76ae');
                    c = c.replace(/\u4e56\u5de7/g, '\u4e56\u4e56\u5de7');
                    c = c.replace(/\u61c2\u4e8b/g, '\u61c2\u4e8b\u4e8b');
                    c = c.replace(/\u4f53\u8d34/g, '\u4f53\u8d34\u8d34');
                    c = c.replace(/\u7ec6\u5fc3/g, '\u7ec6\u5fc3\u5fc3');
                    c = c.replace(/\u7c97\u5fc3/g, '\u7c97\u5fc3\u5fc3');
                    c = c.replace(/\u52c7\u6562/g, '\u52c7\u6562\u6562');
                    c = c.replace(/\u80c6\u5c0f/g, '\u80c6\u5c0f\u5c0f');
                    c = c.replace(/\u575a\u5f3a/g, '\u575a\u5f3a\u5f3a');
                    c = c.replace(/\u8106\u5f31/g, '\u8106\u5f31\u5f31');



                    c = c.replace(/\u73a9\u6e38\u620f/g, '\u73a9\u73a9\u6e38\u620f');
                    c = c.replace(/\u6253\u6e38\u620f/g, '\u6253\u6253\u6e38\u620f');
                    c = c.replace(/\u6253\u724c/g, '\u6253\u6253\u724c');
                    c = c.replace(/\u6253\u9ebb\u5c06/g, '\u6253\u6253\u9ebb\u5c06');
                    c = c.replace(/\u4e0b\u68cb/g, '\u4e0b\u4e0b\u68cb');
                    c = c.replace(/\u9493\u9c7c/g, '\u9493\u9493\u9c7c');
                    c = c.replace(/\u6e38\u6cf3/g, '\u6e38\u6e38\u6cf3');
                    c = c.replace(/\u722c\u5c71/g, '\u722c\u722c\u5c71');
                    c = c.replace(/\u65c5\u884c/g, '\u65c5\u65c5\u884c');
                    c = c.replace(/\u901b\u8857/g, '\u901b\u901b\u8857');
                    c = c.replace(/\u770b\u7535\u5f71/g, '\u770b\u770b\u7535\u5f71');
                    c = c.replace(/\u770b\u89c6\u9891/g, '\u770b\u770b\u89c6\u9891');
                    c = c.replace(/\u542c\u6b4c/g, '\u542c\u542c\u6b4c');
                    c = c.replace(/\u62cd\u7167/g, '\u62cd\u62cd\u7167');
                    c = c.replace(/\u81ea\u62cd/g, '\u81ea\u62cd\u62cd');
                    c = c.replace(/\u76f4\u64ad/g, '\u76f4\u76f4\u64ad');
                    c = c.replace(/\u5531\u6b4c/g, '\u5531\u5531\u6b4c');



                    c = c.replace(/\u501f\u94b1/g, '\u501f\u501f\u7c73');
                    c = c.replace(/\u8fd8\u94b1/g, '\u8fd8\u8fd8\u7c73');
                    c = c.replace(/\u8d5a\u94b1/g, '\u8d5a\u8d5a\u7c73');
                    c = c.replace(/\u82b1\u94b1/g, '\u82b1\u82b1\u7c73');
                    c = c.replace(/\u7701\u94b1/g, '\u7701\u7701\u7c73');
                    c = c.replace(/\u7ea2\u5305/g, '\u7ea2\u5305\u5305');
                    c = c.replace(/\u793c\u7269/g, '\u793c\u7269\u7269');
                    c = c.replace(/\u4e70\u4e70/g, '\u4e70\u4e70\u4e70');
                    c = c.replace(/\u5356\u5356/g, '\u5356\u5356\u5356');



                    c = c.replace(/\u624b\u673a/g, '\u624b\u673a\u673a');
                    c = c.replace(/\u7535\u8111/g, '\u7535\u8111\u8111');
                    c = c.replace(/\u5145\u7535/g, '\u5145\u5145\u7535');
                    c = c.replace(/\u6ca1\u7535/g, '\u6ca1\u7535\u7535');
                    c = c.replace(/\u5173\u673a/g, '\u5173\u673a\u673a');
                    c = c.replace(/\u5f00\u673a/g, '\u5f00\u673a\u673a');
                    c = c.replace(/\u91cd\u542f/g, '\u91cd\u542f\u542f');
                    c = c.replace(/\u5237\u65b0/g, '\u5237\u5237\u65b0');
                    c = c.replace(/\u52a0\u8f7d/g, '\u52a0\u8f7d\u55b5');
                    c = c.replace(/\u7f13\u51b2/g, '\u7f13\u51b2\u55b5');
                    c = c.replace(/\u5361\u4e86/g, '\u5361\u5361\u5566');
                    c = c.replace(/\u6389\u4e86/g, '\u6389\u6389\u5566');
                    c = c.replace(/\u7f51\u4e0d\u597d/g, '\u7f51\u4e0d\u597d\u55b5');
                    c = c.replace(/\u4fe1\u53f7/g, '\u4fe1\u53f7\u55b5');



                    c = c.replace(/\u592a\u725b\u4e86/g, '\u7092\u9e21\u725b');
                    c = c.replace(/\u592a\u5f3a\u4e86/g, '\u7092\u9e21\u5f3a');
                    c = c.replace(/\u5927\u795e/g, '\u5927\u55b5\u795e');
                    c = c.replace(/\u5927\u4f6c/g, '\u5927\u55b5\u8001');
                    c = c.replace(/\u9ad8\u624b/g, '\u9ad8\u55b5\u624b');
                    c = c.replace(/\u5929\u624d/g, '\u5929\u624d\u55b5');
                    c = c.replace(/666/g, '666\u55b5');
                    c = c.replace(/\u7b11\u6b7b/g, '\u7b11\u6b7b\u55b5');
                    c = c.replace(/\u9189\u4e86/g, '\u9189\u9189\u5566');
                    c = c.replace(/\u670d\u4e86/g, '\u670d\u670d\u5566');
                    c = c.replace(/\u7edd\u4e86/g, '\u7edd\u7edd\u5b50');
                    c = c.replace(/\u597d\u5bb6\u4f19/g, '\u597d\u5bb6\u4f19\u55b5');
                    c = c.replace(/\u8fd9\u4e5f\u592a/g, '\u4ecb\u4e5f\u592a');



                    c = c.replace(/\u606d\u559c\u53d1\u8d22/g, '\u606d\u559c\u53d1\u8d22\u55b5');
                    c = c.replace(/\u5927\u5409\u5927\u5229/g, '\u5927\u5409\u5927\u5229\u55b5');
                    c = c.replace(/\u597d\u8fd0\u8fde\u8fde/g, '\u597d\u8fd0\u8fde\u8fde\u55b5');
                    c = c.replace(/\u798f\u6c14/g, '\u798f\u6c14\u55b5');
                    c = c.replace(/\u5e73\u5b89/g, '\u5e73\u5e73\u5b89');
                    c = c.replace(/\u5065\u5eb7/g, '\u5065\u5065\u5eb7');
                    c = c.replace(/\u987a\u5229/g, '\u987a\u987a\u5229');
                    c = c.replace(/\u5feb\u4e50/g, '\u5feb\u4e50\u4e50');
                    c = c.replace(/\u5e78\u798f/g, '\u5e78\u798f\u798f');
                    c = c.replace(/\u751c\u871c/g, '\u751c\u751c\u871c');
                    c = c.replace(/\u7f8e\u6ee1/g, '\u7f8e\u6ee1\u6ee1');
                    c = c.replace(/\u56e2\u5706/g, '\u56e2\u56e2\u5706');
                    c = c.replace(/\u56e2\u5706\u5706/g, '\u56e2\u56e2\u56ed\u56ed');



                    c = c.replace(/^\u53ef\u4ee5[\u5417\u561b]/, '\u9614\u4ee5\u561b');
                    c = c.replace(/^\u884c[\u5417\u561b]/, '\u884c\u55b5');
                    c = c.replace(/^\u597d[\u5417\u561b]/, '\u597d\u55b5');
                    c = c.replace(/^\u8981[\u5417\u561b]/, '\u8981\u55b5');
                    c = c.replace(/^\u6709[\u5417\u561b]/, '\u6709\u55b5');
                    c = c.replace(/^\u4f1a[\u5417\u561b]/, '\u4f1a\u55b5');
                    c = c.replace(/^\u80fd[\u5417\u561b]/, '\u80fd\u55b5');
                    c = c.replace(/^\u77e5\u9053[\u5417\u561b]/, '\u8d44\u9053\u55b5');
                    c = c.replace(/^\u660e\u767d[\u5417\u561b]/, '\u660e\u767d\u55b5');
                    c = c.replace(/^\u61c2[\u5417\u561b]/, '\u61c2\u55b5');
                    c = c.replace(/^\u662f[\u5417\u561b]/, '\u7d20\u55b5');
                    c = c.replace(/^\u60f3[\u5417\u561b]/, '\u60f3\u55b5');
                    c = c.replace(/^\u8981\u4e0d\u8981/, '\u8981\u4e0d\u8981\u55b5');
                    c = c.replace(/^\u597d\u4e0d\u597d/, '\u597d\u4e0d\u55b5');
                    c = c.replace(/^\u80fd\u4e0d\u80fd/, '\u80fd\u4e0d\u80fd\u55b5');



                    c = c.replace(/^\u597d\u7684\u597d\u7684/, '\u597d\u54d2\u597d\u54d2');
                    c = c.replace(/^\u77e5\u9053\u4e86\u77e5\u9053\u4e86/, '\u77e5\u9053\u5566\u77e5\u9053\u5566');
                    c = c.replace(/^\u55ef\u55ef/, '\u55ef\u55ef~');
                    c = c.replace(/^\u597d\u7684/, '\u597d\u54d2');
                    c = c.replace(/^OK/, '\u597d\u54d2');
                    c = c.replace(/^ok/, '\u597d\u54d2');
                    c = c.replace(/^\u884c/, '\u884c\u54d2');
                    c = c.replace(/^\u53ef\u4ee5/, '\u9614\u4ee5\u54d2');
                    c = c.replace(/^\u6ca1\u95ee\u9898/, '\u6ca1\u95ee\u9898\u54d2');
                    c = c.replace(/^\u6536\u5230/, '\u6536\u5230\u55b5');
                    c = c.replace(/^\u636e\u6211\u6240\u77e5/, '\u636e\u54b1\u6240\u77e5');
                    c = c.replace(/^\u6211\u89c9\u5f97/, '\u54b1\u89c9\u5f97');
                    c = c.replace(/^\u6211\u8ba4\u4e3a/, '\u54b1\u8ba4\u4e3a');
                    c = c.replace(/^\u6211\u611f\u89c9/, '\u54b1\u611f\u89c9');
                    c = c.replace(/^\u6211\u60f3/, '\u54b1\u60f3');
                    c = c.replace(/^\u6211\u731c/, '\u54b1\u731c');
                    c = c.replace(/^\u6211\u5efa\u8bae/, '\u54b1\u5efa\u8bae');
                    c = c.replace(/^\u6211\u53d1\u8a93/, '\u54b1\u53d1\u8a93');
                    c = c.replace(/^\u6211\u4fdd\u8bc1/, '\u54b1\u4fdd\u8bc1');



                    c = c.replace(/\u4e0d\u662f\u7684/g, '\u4e0d\u7d20\u6ef4');
                    c = c.replace(/\u6ca1\u6709\u7684/g, '\u59b9\u6cb9\u6ef4');
                    c = c.replace(/\u4e0d\u53ef\u4ee5\u7684/g, '\u9614\u4e0d\u9614\u4ee5\u6ef4');
                    c = c.replace(/\u4e0d\u53ef\u80fd\u7684/g, '\u4e0d\u53ef\u80fd\u6ef4\u55b5');
                    c = c.replace(/\u4e0d\u7528\u4e86/g, '\u4e0d\u7528\u5566');
                    c = c.replace(/\u4e0d\u8981\u4e86/g, '\u4e0d\u8981\u5566');
                    c = c.replace(/\u4e0d\u4e86/g, '\u4e0d\u5566');
                    c = c.replace(/\u4e0d\u884c\u4e0d\u884c/g, '\u4e0d\u884c\u4e0d\u884c\u5566');
                    c = c.replace(/\u4e0d\u597d\u4e0d\u597d/g, '\u4e0d\u597d\u4e0d\u597d\u5566');
                    c = c.replace(/\u4e0d\u5bf9\u4e0d\u5bf9/g, '\u4e0d\u5bf9\u4e0d\u5bf9\u5566');
                    c = c.replace(/\u4e0d\u662f\u4e0d\u662f/g, '\u4e0d\u7d20\u4e0d\u7d20\u5566');



                    c = c.replace(/\u8d85\u7ea7/g, '\u7092\u9e21');
                    c = c.replace(/\u6781\u5176/g, '\u7092\u9e21');
                    c = c.replace(/\u6781\u5ea6/g, '\u7092\u9e21');
                    c = c.replace(/\u8fc7\u4e8e/g, '\u8fc7\u4e8e\u55b5');
                    c = c.replace(/\u6709\u70b9[\u70b9]?/g, '\u6709\u70b9\u70b9');
                    c = c.replace(/\u7a0d\u5fae/g, '\u7a0d\u7a0d\u5fae');
                    c = c.replace(/\u4e00\u70b9\u513f/g, '\u4e00\u4e22\u4e22');
                    c = c.replace(/\u4e00\u4e9b\u4e9b/g, '\u4e00\u4e9b\u4e9b');
                    c = c.replace(/\u5f88\u591a/g, '\u597d\u591a');
                    c = c.replace(/\u975e\u5e38\u591a/g, '\u7092\u9e21\u591a');
                    c = c.replace(/\u592a\u591a/g, '\u592a\u591a\u5566');
                    c = c.replace(/\u5f88\u5c11/g, '\u597d\u5c11\u55b5');
                    c = c.replace(/\u592a\u5c11/g, '\u592a\u5c11\u5566');



                    c = c.replace(/\u597d\u7684\u5462/g, '\u597d\u55b5');
                    c = c.replace(/\u662f\u5462/g, '\u7d20\u55b5');
                    c = c.replace(/\u6765\u5462/g, '\u6765\u55b5');
                    c = c.replace(/\u53bb\u5462/g, '\u53bb\u55b5');
                    c = c.replace(/\u8981\u5462/g, '\u8981\u55b5');
                    c = c.replace(/\u6709\u5462/g, '\u6709\u55b5');
                    c = c.replace(/\u5728\u5462/g, '\u5728\u55b5');
                    c = c.replace(/\u77e5\u9053\u5462/g, '\u8d44\u9053\u55b5');
                    c = c.replace(/\u4e0d\u884c\u5566/g, '\u4e0d\u884c\u55b5');
                    c = c.replace(/\u4e0d\u8981\u5566/g, '\u4e0d\u8981\u55b5');
                    c = c.replace(/\u597d\u5566\u597d\u5566/g, '\u597d\u55b5\u597d\u55b5');
                    c = c.replace(/\u597d\u5566/g, '\u597d\u55b5');
                    c = c.replace(/\u5bf9\u5566/g, '\u5bf9\u55b5');
                    c = c.replace(/\u7b97\u5566/g, '\u7b97\u55b5');
                    c = c.replace(/\u5403\u5566/g, '\u6b21\u55b5');
                    c = c.replace(/\u7761\u5566/g, '\u788e\u55b5');
                    c = c.replace(/\u8d70\u5566/g, '\u8d70\u55b5');
                    c = c.replace(/\u6765\u5566/g, '\u6765\u55b5');
                    c = c.replace(/\u53bb\u5566/g, '\u53bb\u55b5');
                    c = c.replace(/\u522b\u8fd9\u6837\u561b/g, '\u522b\u8fd9\u6837\u55b5');
                    c = c.replace(/\u597d\u60f3/g, '\u597d\u60f3\u55b5');
                    c = c.replace(/\u597d\u559c\u6b22/g, '\u597d\u559c\u6b22\u55b5');
                    c = c.replace(/^\u6211\u997f\u4e86/g, '\u4eba\u5bb6\u997f\u55b5');
                    c = c.replace(/\u56f0\u4e86/g, '\u56f0\u55b5');
                    c = c.replace(/\u5feb[\u70b9]/g, '\u5feb\u5feb\u55b5');
                    c = c.replace(/\u6162[\u70b9]/g, '\u6162\u6162\u55b5');
                    c = c.replace(/\u7b49\u4e00\u4e0b/g, '\u7b49\u4e00\u4e0b\u55b5');
                    c = c.replace(/\u7b49\u4f1a\u513f/g, '\u7b49\u4f1a\u513f\u55b5');
                    c = c.replace(/[\u6211\u6765](\u627e\u4f60|\u966a\u4f60)/g, '$1\u55b5');
                    c = c.replace(/\u732b\u5a18/g, '\u732b\u5a18\u9171');
                    c = c.replace(/\u5c0f\u732b\u54aa/g, '\u5c0f\u55b5\u54aa');
                    c = c.replace(/\u732b\u722a/g, '\u55b5\u722a\u722a');
                    c = c.replace(/\u732b\u8033/g, '\u55b5\u8033\u6735');
                    c = c.replace(/\u732b\u5c3e/g, '\u55b5\u5c3e\u5df4');
                    c = c.replace(/\u732b\u7cae/g, '\u55b5\u7cae');
                    c = c.replace(/\u732b\u7a9d/g, '\u55b5\u7a9d');
                    c = c.replace(/\u6253\u6eda/g, '\u6253\u4e2a\u6eda\u6eda');
                    c = c.replace(/\u4f38\u61d2\u8170/g, '\u4f38\u4e2a\u55b5\u61d2\u8170');
                    c = c.replace(/\u8737/g, '\u8737\u6210\u55b5\u56e2');
                    c = c.replace(/\u6652[\u592a\u9633]/g, '\u6652\u55b5\u592a\u9633');
                    c = c.replace(/\u6652\u592a\u9633/g, '\u6652\u55b5\u592a\u9633');
                    c = c.replace(/\u547c\u565c/g, '\u547c\u565c\u565c');
                    c = c.replace(/\u5495\u565c/g, '\u5495\u565c\u565c');
                    c = c.replace(/\u8e6d\u8e6d/g, '\u8e6d\u8e6d\u8e6d');
                    c = c.replace(/\u8214(\u6bdb|\u722a)/g, '\u8214\u8214$1');
                    c = c.replace(/\u7406\u6bdb/g, '\u7406\u6bdb\u6bdb');
                    c = c.replace(/\u6d17\u8138/g, '\u6d17\u8138\u8138');
                    c = c.replace(/\u6447\u5c3e\u5df4/g, '\u6447\u6447\u5c3e\u5df4');
                    c = c.replace(/\u7c98\u4eba/g, '\u7c98\u4eba\u55b5');
                    c = c.replace(/\u6492\u5a07/g, '\u6492\u55b5\u5a07');
                    c = c.replace(/\u8981\u62b1\u62b1/g, '\u8981\u55b5\u62b1\u62b1');
                    c = c.replace(/\u8981\u6478\u6478/g, '\u8981\u55b5\u6478\u6478');



                    c = c.replace(/\u4e0d\u561b/g, '\u4e0d\u561b\u4e0d\u561b');
                    c = c.replace(/\u597d\u561b/g, '\u597d\u561b\u597d\u561b');
                    c = c.replace(/\u8981\u561b/g, '\u8981\u561b\u8981\u561b');
                    c = c.replace(/\u4eba\u5bb6\u4e0d\u8981/g, '\u4eba\u5bb6\u4e0d\u8981\u561b');
                    c = c.replace(/\u4eba\u5bb6\u8981/g, '\u4eba\u5bb6\u8981\u561b');
                    c = c.replace(/^\u542c\u8bf4/, '\u4eba\u5bb6\u542c\u8bf4');
                    c = c.replace(/^\u90a3\u597d\u5427/, '\u90a3\u597d\u53ed');
                    c = c.replace(/^\u55ef[\u5462]?/, '\u55ef\u5450');
                    c = c.replace(/\u4e0d\u4f1a/g, '\u4e0d\u4f1a\u54df');
                    c = c.replace(/\u4e0d\u61c2/g, '\u4e0d\u61c2\u54df');
                    c = c.replace(/\u4e0d\u6562/g, '\u4e0d\u6562\u54df');
                    c = c.replace(/^\u6211(\u8981|\u60f3|\u53bb|\u6765|\u770b|\u542c|\u8bf4|\u95ee|\u5403|\u559d|\u73a9|\u4e70|\u627e|\u7b49)/, '\u54b1$1');
                    c = c.replace(/\u770b\u6211/g, '\u770b\u54b1');
                    c = c.replace(/\u542c\u6211/g, '\u542c\u54b1');
                    c = c.replace(/\u8ddf\u6211/g, '\u8ddf\u54b1');
                    c = c.replace(/\u8ba9\u6211/g, '\u8ba9\u54b1');


                    c = c.replace(/[\u9999\u8f6f\u751c\u6696\u51c9\u70ed\u8fa3\u9178\u82e6\u54b8\u9c9c\u8106\u5ae9\u6ed1]/g, '$&$&');


                    c = c.replace(/\u9999\u9999\u9999/g, '\u9999\u9999');
                    c = c.replace(/\u8f6f\u8f6f\u8f6f/g, '\u8f6f\u8f6f');
                    c = c.replace(/\u751c\u751c\u751c/g, '\u751c\u751c');
                    c = c.replace(/\u6696\u6696\u6696/g, '\u6696\u6696');
                    c = c.replace(/\u51c9\u51c9\u51c9/g, '\u51c9\u51c9');
                    c = c.replace(/\u597d\u597d/g, '\u597d\u597d\u597d');
                    c = c.replace(/\u8f7b\u8f7b/g, '\u8f7b\u8f7b\u8f7b');
                    c = c.replace(/\u6162\u6162/g, '\u6162\u6162\u6162');
                    c = c.replace(/\u5feb\u5feb/g, '\u5feb\u5feb\u5feb');
                    c = c.replace(/\u65e9\u65e9/g, '\u65e9\u65e9\u65e9');
                    c = c.replace(/\u665a\u665a/g, '\u665a\u665a\u665a');
                    c = c.replace(/\u591a\u591a/g, '\u591a\u591a\u591a');
                    c = c.replace(/\u5c11\u5c11/g, '\u5c11\u5c11\u5c11');
                    c = c.replace(/\u5927\u5927/g, '\u5927\u5927\u5927');
                    c = c.replace(/\u5c0f\u5c0f/g, '\u5c0f\u5c0f\u5c0f');
                    c = c.replace(/\u9ad8\u9ad8/g, '\u9ad8\u9ad8\u9ad8');
                    c = c.replace(/\u4f4e\u4f4e/g, '\u4f4e\u4f4e\u4f4e');
                    c = c.replace(/\u957f\u957f\u7684/g, '\u957f\u957f\u7684');
                    c = c.replace(/\u77ed\u77ed/g, '\u77ed\u77ed\u77ed');
                    c = c.replace(/\u7c97\u7c97/g, '\u7c97\u7c97\u7c97');
                    c = c.replace(/\u7ec6\u7ec6/g, '\u7ec6\u7ec6\u7ec6');
                    c = c.replace(/\u975e\u5e38/g, '\u7092\u9e21');
                    c = c.replace(/\u5341\u5206/g, '\u7092\u9e21');
                    c = c.replace(/\u771f\u5fc3/g, '\u7092\u9e21');
                    c = c.replace(/\u7279\u522b/g, '\u7092\u9e21');
                    c = c.replace(/\u5f88\u597d\u5403/g, '\u7092\u9e21\u597d\u6b21');
                    c = c.replace(/\u5f88\u597d\u559d/g, '\u7092\u9e21\u597d\u559d');
                    c = c.replace(/\u5f88\u597d\u73a9/g, '\u7092\u9e21\u597d\u73a9');
                    c = c.replace(/\u5f88\u597d\u770b/g, '\u7092\u9e21\u597d\u770b');
                    c = c.replace(/\u5f88\u597d\u542c/g, '\u7092\u9e21\u597d\u542c');
                    c = c.replace(/\u597d\u5389\u5bb3/g, '\u7092\u9e21\u5389\u5bb3');
                    c = c.replace(/\u597d\u53ef\u7231/g, '\u6572\u53ef\u7231');
                    c = c.replace(/\u597d\u559c\u6b22/g, '\u6572\u559c\u6b22');
                    c = c.replace(/\u597d\u9614\u7231/g, '\u6572\u9614\u7231');
                    c = c.replace(/\u5f88\u53ef\u7231/g, '\u7092\u9e21\u53ef\u7231');
                    c = c.replace(/\u5de8\u53ef\u7231/g, '\u7092\u9e21\u53ef\u7231');
                    c = c.replace(/\u5e3d\u5e3d/g, '\u5e3d\u5e3d');
                    c = c.replace(/\u889c\u889c/g, '\u889c\u889c');
                    c = c.replace(/\u88d9\u88d9/g, '\u88d9\u88d9');
                    c = c.replace(/\u88e4\u88e4/g, '\u88e4\u88e4');
                    c = c.replace(/\u8863\u8863/g, '\u8863\u8863');
                    c = c.replace(/\u5a03\u5a03/g, '\u5a03\u5a03');
                    c = c.replace(/\u718a\u718a/g, '\u718a\u718a');
                    c = c.replace(/\u5154\u5154/g, '\u5154\u5154');
                    c = c.replace(/\u72d7\u72d7/g, '\u72d7\u52fe');
                    c = c.replace(/\u732b\u732b/g, '\u732b\u9171');
                    c = c.replace(/\u732a\u732a/g, '\u732a\u732a');
                    c = c.replace(/\u9f20\u9f20/g, '\u9f20\u9f20');
                    c = c.replace(/\u9e1f\u9e1f/g, '\u557e\u557e');
                    c = c.replace(/\u9c7c\u9c7c/g, '\u9c7c\u9c7c');
                    c = c.replace(/\u82b1\u82b1/g, '\u82b1\u82b1');
                    c = c.replace(/\u8349\u8349/g, '\u8349\u8349');
                    c = c.replace(/\u6811\u6811/g, '\u6811\u6811');
                    c = c.replace(/\u77f3\u77f3/g, '\u77f3\u77f3');
                    c = c.replace(/\u6c34\u6c34/g, '\u6c34\u6c34');
                    c = c.replace(/\u706b\u706b/g, '\u706b\u706b');
                    c = c.replace(/\u996d\u996d/g, '\u996d\u996d');
                    c = c.replace(/\u83dc\u83dc/g, '\u83dc\u83dc');
                    c = c.replace(/\u6c64\u6c64/g, '\u6c64\u6c64');
                    c = c.replace(/\u7cd6\u7cd6/g, '\u7cd6\u7cd6');
                    c = c.replace(/\u679c\u679c/g, '\u679c\u679c');
                    c = c.replace(/\u5305\u5305/g, '\u5305\u5305');
                    c = c.replace(/\u997c\u997c/g, '\u997c\u997c');
                    c = c.replace(/\u9762\u9762/g, '\u9762\u9762');





                    c = c.replace(/^\u597d\u54df/, '\u597d\u54df');
                    c = c.replace(/^\u884c\u54df/, '\u884c\u54df');
                    c = c.replace(/^\u77e5\u9053\u54df/, '\u77e5\u9053\u54df');
                    c = c.replace(/^\u4e0d\u9519\u54df/, '\u4e0d\u9519\u54df');
                    c = c.replace(/\u597d\uff01/g, '\u597d\u54df');
                    c = c.replace(/\u884c\uff01/g, '\u884c\u54df');
                    c = c.replace(/\u77e5\u9053\u4e86\uff01/g, '\u77e5\u9053\u54df');
                    c = c.replace(/\u6765\u4e86$/, '\u6765\u4e86\u54df');
                    c = c.replace(/\u8d70\u4e86$/, '\u8d70\u4e86\u54df');
                    c = c.replace(/\u8dd1\u4e86$/, '\u8dd1\u4e86\u54df');
                    c = c.replace(/\u4f1a\u4e86$/, '\u4f1a\u4e86\u54df');
                    c = c.replace(/\u61c2\u4e86$/, '\u61c2\u4e86\u54df');
                    c = c.replace(/\u597d\u4e86$/, '\u597d\u4e86\u54df');
                    c = c.replace(/\u884c\u4e86$/, '\u884c\u4e86\u54df');
                    c = c.replace(/\u5bf9\u4e86$/, '\u5bf9\u4e86\u54df');
                    c = c.replace(/\u53ef\u4ee5\uff1f$/, '\u9614\u4ee5\u54df');
                    c = c.replace(/\u884c\u4e0d\uff1f$/, '\u884c\u4e0d\u54df');
                    c = c.replace(/\u662f\u4e48$/, '\u7d20\u4e48\u54df');
                    c = c.replace(/\u52a0\u6cb9\u54df/g, '\u52a0\u6cb9\u54df');
                    c = c.replace(/\u52aa\u529b\u54df/g, '\u52aa\u529b\u54df');
                    c = c.replace(/\u575a\u6301\u54df/g, '\u575a\u6301\u54df');
                    c = c.replace(/\u522b\u653e\u5f03\u54df/g, '\u522b\u653e\u5f03\u54df');



                    c = c.replace(/\u53bb\u7684\u8bf4/g, '\u53bb\u7684\u8bf4');
                    c = c.replace(/\u505a\u7684\u8bf4/g, '\u505a\u7684\u8bf4');
                    c = c.replace(/\u771f\u7684\u8bf4/g, '\u771f\u7684\u8bf4');
                    c = c.replace(/\u6b63\u662f\u8bf4/g, '\u6b63\u662f\u8bf4');
                    c = c.replace(/\u662f\u7684\u8bf4/g, '\u662f\u7684\u8bf4');
                    c = c.replace(/\u597d\u54d2\u7684\u8bf4/g, '\u597d\u54d2\u7684\u8bf4');
                    c = c.replace(/\u53ef\u7231\u6ef4\u8bf4/g, '\u53ef\u7231\u6ef4\u8bf4');
                    c = c.replace(/\u771f\u6ef4\u8bf4/g, '\u771f\u6ef4\u8bf4');
                    c = c.replace(/\u5f88[\u597d\u68d2\u5f3a\u5389\u5bb3]\u7684\u8bf4/g, '$&\u7684\u8bf4');
                    c = c.replace(/\u8d85[\u5389\u5bb3\u68d2\u597d\u5f3a]\u7684\u8bf4/g, '\u7092\u9e21$1\u7684\u8bf4');
                    c = c.replace(/\u624d\u4e0d\u8981/g, '\u624d\u4e0d\u8981\u7684\u8bf4');
                    c = c.replace(/\u624d\u4e0d\u53bb/g, '\u624d\u4e0d\u53bb\u7684\u8bf4');
                    c = c.replace(/\u624d\u4e0d/g, '\u624d\u4e0d\u7684\u8bf4');
                    c = c.replace(/^\u6211\u624d/, '\u54b1\u624d');
                    c = c.replace(/\u597d\u65e0\u804a/g, '\u597d\u65e0\u804a\u7684\u8bf4');
                    c = c.replace(/\u597d\u5389\u5bb3/g, '\u597d\u5389\u5bb3\u7684\u8bf4');
                    c = c.replace(/\u597d\u68d2/g, '\u597d\u68d2\u7684\u8bf4');
                    c = c.replace(/\u597d\u53ef\u7231/g, '\u597d\u9614\u7231\u7684\u8bf4');
                    c = c.replace(/\u597d\u5403/g, '\u597d\u6b21\u7684\u8bf4');
                    c = c.replace(/\u597d\u73a9/g, '\u597d\u73a9\u7684\u8bf4');
                    c = c.replace(/\u597d\u96be/g, '\u597d\u96be\u7684\u8bf4');
                    c = c.replace(/\u597d\u70e6/g, '\u597d\u70e6\u7684\u8bf4');
                    c = c.replace(/\u597d\u7d2f/g, '\u597d\u7d2f\u7d2f\u7684\u8bf4');
                    c = c.replace(/\u597d\u6c14/g, '\u597d\u6c14\u7684\u8bf4');
                    c = c.replace(/\u597d\u51b7/g, '\u597d\u51b7\u7684\u8bf4');
                    c = c.replace(/\u597d\u70ed/g, '\u597d\u70ed\u7684\u8bf4');
                    c = c.replace(/\u597d\u770b/g, '\u597d\u770b\u7684\u8bf4');
                    c = c.replace(/\u597d\u542c/g, '\u597d\u542c\u7684\u8bf4');
                    c = c.replace(/\u597d\u7528/g, '\u597d\u7528\u7684\u8bf4');
                    c = c.replace(/\u60f3\u53bb/g, '\u60f3\u53bb\u7684\u8bf4');
                    c = c.replace(/\u8981\u5403/g, '\u8981\u6b21\u7684\u8bf4');
                    c = c.replace(/\u8981\u559d/g, '\u8981\u559d\u7684\u8bf4');
                    c = c.replace(/\u8981\u73a9/g, '\u8981\u73a9\u7684\u8bf4');
                    c = c.replace(/\u8981\u770b/g, '\u8981\u770b\u6ef4\u8bf4');
                    c = c.replace(/^\u6211\u60f3/, '\u54b1\u60f3');
                    c = c.replace(/^\u6211\u8981/, '\u54b1\u8981');
                    c = c.replace(/^\u6211[\u53bb\u6765\u4f1a\u80fd]/, '\u54b1$1');
                    c = c.replace(/^\u6211\u4eec\u53ef\u4ee5/, '\u54b1\u4eec\u9614\u4ee5');
                    c = c.replace(/^\u6211\u4eec\u8981/, '\u54b1\u4eec\u8981');



                    c = c.replace(/\u624d\u4e0d\u662f/g, '\u624d\u4e0d\u7d20');
                    c = c.replace(/\u624d\u4e0d\u7ba1/g, '\u624d\u4e0d\u7ba1\u7684\u8bf4');
                    c = c.replace(/\u624d\u4e0d\u7406/g, '\u624d\u4e0d\u7406\u7684\u8bf4');
                    c = c.replace(/\u4f60\u624d/g, '\u4e43\u624d');
                    c = c.replace(/\u4eba\u5bb6\u624d/g, '\u4eba\u5bb6\u624d');
                    c = c.replace(/\u4eba\u5bb6\u624d\u4e0d/g, '\u4eba\u5bb6\u624d\u4e0d');
                    c = c.replace(/^\u54fc/, '\u54fc~');
                    c = c.replace(/^\u54fc\uff01/, '\u54fc\uff01');
                    c = c.replace(/^\u5207/, '\u5207~');
                    c = c.replace(/\u4ec0\u4e48\u561b/g, '\u795e\u9a6c\u561b');
                    c = c.replace(/\u53c8\u4e0d\u662f/g, '\u53c8\u4e0d\u7d20\u7684\u8bf4');
                    c = c.replace(/\u54ea\u91cc\u662f/g, '\u54ea\u91cc\u7d20\u7684\u8bf4');
                    c = c.replace(/\u600e\u4e48\u4f1a/g, '\u80bf\u4e48\u4f1a\u561b');
                    c = c.replace(/\u600e\u4e48\u53ef\u80fd/g, '\u80bf\u4e48\u53ef\u80fd\u561b');
                    c = c.replace(/\u8c01\u8bf4\u7684/g, '\u8c01\u8bf4\u7684\u5566');
                    c = c.replace(/\u624d\u602a/g, '\u624d\u602a\u55b5');
                    c = c.replace(/\u624d\u602a\u7684\u8bf4/g, '\u624d\u602a\u7684\u8bf4');
                    c = c.replace(/\u54fc/g, '\u54fc');



                    c = c.replace(/\u4e0d\u8981\u7ba1\u6211/g, '\u4e0d\u8981\u7ba1\u54b1\u5566');
                    c = c.replace(/\u8ddf\u6211\u6765/g, '\u8ddf\u54b1\u6765');
                    c = c.replace(/\u770b\u6211\u7684/g, '\u770b\u54b1\u7684');
                    c = c.replace(/\u542c\u6211\u7684/g, '\u542c\u54b1\u7684');
                    c = c.replace(/\u8ba9\u6211\u6765/g, '\u8ba9\u54b1\u6765');
                    c = c.replace(/\u4ea4\u7ed9\u6211\u5427/g, '\u4ea4\u7ed9\u54b1\u53ed');
                    c = c.replace(/\u6211\u6765\u5e2e\u4f60/g, '\u54b1\u6765\u5e2e\u4e43');
                    c = c.replace(/\u6211\u6559\u4f60/g, '\u54b1\u6559\u4e43');
                    c = c.replace(/\u6211\u5e26\u4f60\u53bb/g, '\u54b1\u5e26\u4e43\u53bb');
                    c = c.replace(/\u6211\u966a\u4f60/g, '\u54b1\u966a\u4e43');
                    c = c.replace(/\u6211\u4fdd\u62a4\u4f60/g, '\u54b1\u4fdd\u62a4\u4e43');
                    c = c.replace(/\u76f8\u4fe1\u6211/g, '\u76f8\u4fe1\u54b1\u53ed');
                    c = c.replace(/^\u6211\u53ef\u4ee5\u7684/, '\u54b1\u9614\u4ee5\u54d2');
                    c = c.replace(/^\u6211\u884c\u7684/, '\u54b1\u884c\u54d2');
                    c = c.replace(/^\u6ca1\u95ee\u9898/, '\u6ca1\u95ee\u9898\u54df');
                    c = c.replace(/^\u5305\u5728\u6211\u8eab\u4e0a/, '\u5305\u5728\u54b1\u8eab\u4e0a\u54df');
                    c = c.replace(/^\u770b\u6211\u7684\u5427/, '\u770b\u54b1\u7684\u53ed');
                    c = c.replace(/^\u6211\u6765/, '\u54b1\u6765');
                    c = c.replace(/^\u6211\u4e0a/, '\u54b1\u4e0a');
                    c = c.replace(/^\u6211\u51b2/, '\u54b1\u51b2');



                    c = c.replace(/\u8fd9\u4e1c\u897f/g, '\u4ecb\u4e1c\u897f');
                    c = c.replace(/\u90a3\u4e1c\u897f/g, '\u8fa3\u4e1c\u897f');
                    c = c.replace(/\u8fd9\u73a9\u610f/g, '\u4ecb\u73a9\u610f');
                    c = c.replace(/\u90a3\u73a9\u610f/g, '\u8fa3\u73a9\u610f');
                    c = c.replace(/\u8fd9\u91cc\u5566/g, '\u8fd9\u7406\u5566');
                    c = c.replace(/\u90a3\u91cc\u5566/g, '\u90a3\u7406\u5566');
                    c = c.replace(/\u8fd9\u8fb9\u5566/g, '\u8fd9\u8fb9\u5566');
                    c = c.replace(/\u90a3\u8fb9\u5566/g, '\u90a3\u8fb9\u5566');
                    c = c.replace(/\u5c31\u8fd9\u6837/g, '\u5c31\u9171');
                    c = c.replace(/\u5c31\u90a3\u6837/g, '\u5c31\u917f');
                    c = c.replace(/\u8fd9\u5bb6\u4f19/g, '\u4ecb\u5bb6\u4f19');
                    c = c.replace(/\u90a3\u5bb6\u4f19/g, '\u8fa3\u5bb6\u4f19');
                    c = c.replace(/\u8fd9\u8d27/g, '\u4ecb\u8d27');
                    c = c.replace(/\u90a3\u8d27/g, '\u8fa3\u8d27');



                    c = c.replace(/\u8d70\u5566/g, '\u8d70\u5566\u8d70\u5566');
                    c = c.replace(/\u53bb\u73a9/g, '\u53bb\u73a9\u73a9');
                    c = c.replace(/\u5feb\u6765/g, '\u5feb\u6765\u54df');
                    c = c.replace(/\u5feb\u770b/g, '\u5feb\u770b\u54df');
                    c = c.replace(/\u5feb\u542c/g, '\u5feb\u542c\u54df');
                    c = c.replace(/\u5feb\u70b9/g, '\u5feb\u70b9\u5566');
                    c = c.replace(/\u5feb\u8d70/g, '\u5feb\u8d70\u5566');
                    c = c.replace(/\u5feb\u8dd1/g, '\u5feb\u8dd1\u54df');
                    c = c.replace(/\u5feb\u5feb/g, '\u5feb\u5feb');
                    c = c.replace(/\u8d76\u7d27/g, '\u8d76\u7d27\u54df');
                    c = c.replace(/\u9a6c\u4e0a\u6765/g, '\u9a6c\u4e0a\u6765\u54df');
                    c = c.replace(/\u7b49\u7b49\u6211/g, '\u7b49\u7b49\u54b1\u54df');
                    c = c.replace(/\u7b49\u6211/g, '\u7b49\u7b49\u54b1');
                    c = c.replace(/\u7b49\u6211\u4e00\u4e0b/g, '\u7b49\u54b1\u4e00\u4e0b\u54df');



                    c = c.replace(/\u4f60\u884c\u4e0d\u884c/g, '\u4e43\u884c\u4e0d\u884c\u55b5');
                    c = c.replace(/\u4f60\u6765\u4e0d\u6765/g, '\u4e43\u6765\u4e0d\u6765\u55b5');
                    c = c.replace(/\u4f60\u53bb\u4e0d\u53bb/g, '\u4e43\u53bb\u4e0d\u53bb\u55b5');
                    c = c.replace(/\u4f60\u597d\u70e6/g, '\u4e43\u597d\u70e6\u55b5');
                    c = c.replace(/\u4f60\u771f\u70e6/g, '\u4e43\u771f\u70e6\u55b5');
                    c = c.replace(/\u5435\u6b7b\u4e86/g, '\u5435\u6b7b\u55b5');
                    c = c.replace(/\u77e5\u9053\u4e86\u77e5\u9053\u4e86/g, '\u77e5\u9053\u5566\u77e5\u9053\u5566');
                    c = c.replace(/\u884c\u4e86\u884c\u4e86/g, '\u884c\u5566\u884c\u5566');
                    c = c.replace(/\u597d\u5566\u597d\u5566/g, '\u597d\u5566\u597d\u5566');
                    c = c.replace(/\u7b97\u4e86\u7b97\u4e86/g, '\u7b97\u5566\u7b97\u5566');
                    c = c.replace(/\u597d\u597d\u597d/g, '\u597d\u54d2\u597d\u54d2');
                    c = c.replace(/\u662f\u662f\u662f/g, '\u7d20\u7d20\u7d20');
                    c = c.replace(/\u5bf9\u5bf9\u5bf9/g, '\u5bf9\u5bf9\u5bf9\u54d2');
                    c = c.replace(/\u70e6\u4e0d\u70e6/g, '\u70e6\u4e0d\u70e6\u5566\u55b5');
                    c = c.replace(/\u6709\u5b8c\u6ca1\u5b8c/g, '\u6709\u5b8c\u6ca1\u5b8c\u5566\u55b5');
                    c = c.replace(/\u591f\u4e86/g, '\u591f\u5566\u591f\u5566');
                    c = c.replace(/\u884c\u4e86/g, '\u884c\u4e86\u5566');



                    c = c.replace(/^I[ ]?see/, '\u8d44\u9053\u5566');
                    c = c.replace(/^Got[ ]?it/, '\u6536\u5230\u54df');
                    c = c.replace(/^Sure/, '\u597d\u54df');
                    c = c.replace(/^OK[Kk]?/, '\u597d\u54df');
                    c = c.replace(/^\u55ef\u54fc/, '\u55ef\u54fc~');
                    c = c.replace(/^\u54ce\u563f/, '\u54ce\u563f~');
                    c = c.replace(/^\u54ce\u5440/, '\u54ce\u5440~');
                    c = c.replace(/^\u54ce\u54df/, '\u54ce\u54df\u5582');
                    c = c.replace(/^\u7b97\u4e86\u7b97\u4e86/, '\u7b97\u5566\u7b97\u5566');
                    c = c.replace(/^\u90a3\u5c31\u8fd9\u6837/, '\u90a3\u5c31\u9171\u7d2b');
                    c = c.replace(/^\u968f\u4fbf/, '\u968f\u4fbf\u5566');
                    c = c.replace(/^\u65e0\u6240\u8c13/, '\u65e0\u6240\u8c13\u5566');
                    c = c.replace(/^\u90fd\u53ef\u4ee5/, '\u90fd\u53ef\u4ee5\u54df');
                    c = c.replace(/^\u600e\u6837\u90fd\u884c/, '\u80bf\u6837\u90fd\u884c\u55b5');
                    c = c.replace(/^\u90fd\u884c/, '\u90fd\u884c\u54df');
                    c = c.replace(/^\u542c\u4f60\u7684/, '\u542c\u4e43\u7684');
                    c = c.replace(/^\u542c\u4f60\u7684\u5427/, '\u542c\u4e43\u7684\u53ed');
                    c = c.replace(/^\u4f60\u8bf4\u4e86\u7b97/, '\u4e43\u8bf4\u4e86\u7b97');
                    c = c.replace(/^\u62dc\u6258[\u4f60\u4e86]/, '\u62dc\u6258\u4e43\u5566');
                    c = c.replace(/^\u9ebb\u70e6[\u4f60\u4e86]/, '\u9ebb\u70e6\u4e43\u5566');
                    c = c.replace(/^\u52a0\u6cb9/, '\u52a0\u6cb9\u54df');
                    c = c.replace(/^\u52aa\u529b/, '\u52aa\u529b\u54df');
                    c = c.replace(/^\u575a\u6301/, '\u575a\u6301\u54df');
                    c = c.replace(/^\u522b\u653e\u5f03/, '\u522b\u653e\u5f03\u54df');
                    c = c.replace(/^\u6ca1\u95ee\u9898/, '\u6ca1\u95ee\u9898\u54df');
                    c = c.replace(/^\u53ef\u4ee5\u7684/, '\u9614\u4ee5\u54df');
                    c = c.replace(/^\u505a\u5f97[\u597d\u68d2]/, '\u505a\u5f97\u4e0d\u9519\u54df');
                    c = c.replace(/^\u8c22\u8c22\u4f60/, '\u8c22\u8c22\u4e43');
                    c = c.replace(/^\u4e0d\u7528\u8c22/, '\u4e0d\u7528\u8c22\u55b5');
                    c = c.replace(/^\u4e0d\u5ba2\u6c14/, '\u4e0d\u5ba2\u6c14\u54df');
                    c = c.replace(/^\u5bf9\u4e0d\u8d77/, '\u62b1\u6b49\u5450');
                    c = c.replace(/^\u62b1\u6b49/, '\u62b1\u6b49\u5450');



                    c = c.replace(/\u54c7[\uff01!]/, '\u54c7\u567b\uff01');
                    c = c.replace(/\u54c7\u585e/g, '\u54c7\u567b');
                    c = c.replace(/\u597d\u8036/g, '\u597d\u8036\uff01');
                    c = c.replace(/\u8036/g, '\u8036~');
                    c = c.replace(/\u4e07\u5c81/g, '\u4e07\u5c81\uff01');
                    c = c.replace(/\u592a\u68d2\u5566/g, '\u592a\u68d2\u5566\uff01');
                    c = c.replace(/\u592a\u723d\u5566/g, '\u592a\u723d\u5566\uff01');
                    c = c.replace(/\u592a\u597d\u4e86/g, '\u592a\u597d\u5566\uff01');
                    c = c.replace(/\u641e\u5b9a/g, '\u641e\u5b9a\uff01');
                    c = c.replace(/\u5b8c\u6210/g, '\u5b8c\u6210\uff01');
                    c = c.replace(/\u80dc\u5229/g, '\u80dc\u5229\uff01');
                    c = c.replace(/\u8d62\u4e86/g, '\u8d62\u5566\uff01');
                    c = c.replace(/\u8f93\u4e86/g, '\u8f93\u5566…');
                    c = c.replace(/\u51b2\u554a/g, '\u51b2\u9e2d\uff01');
                    c = c.replace(/\u4e0a\u554a/g, '\u4e0a\u9e2d\uff01');
                    c = c.replace(/\u8d70\u554a/g, '\u8d70\u9e2d\uff01');
                    c = c.replace(/\u6765\u554a/g, '\u6765\u9e2d\uff01');
                    c = c.replace(/\u53bb\u554a/g, '\u53bb\u9e2d\uff01');
                    c = c.replace(/\u5e72\u676f/g, '\u5e72\u676f~\uff01');
                    c = c.replace(/\u4e3e\u676f/g, '\u4e3e\u676f~\uff01');
                    c = c.replace(/\u5e86\u795d/g, '\u5e86\u795d\u5e86\u795d\uff01');



                    c = c.replace(/\u592a\u68d2\u4e86/g, '\u7092\u9e21\u68d2\u7684\u8bf4');
                    c = c.replace(/\u592a\u5389\u5bb3\u4e86/g, '\u7092\u9e21\u5389\u5bb3\u7684\u8bf4');
                    c = c.replace(/\u592a\u5f3a\u4e86/g, '\u7092\u9e21\u5f3a\u7684\u8bf4');
                    c = c.replace(/\u592a\u725b\u4e86/g, '\u7092\u9e21\u725b\u7684\u8bf4');
                    c = c.replace(/\u592a\u53ef\u7231\u4e86/g, '\u7092\u9e21\u9614\u7231\u7684\u8bf4');
                    c = c.replace(/\u592a\u597d\u4e86/g, '\u592a\u597d\u5566\u7684\u8bf4');
                    c = c.replace(/\u592a\u7f8e\u4e86/g, '\u592a\u7f8e\u597d\u5566\u7684\u8bf4');
                    c = c.replace(/\u592a\u597d\u73a9\u4e86/g, '\u7092\u9e21\u597d\u73a9\u7684\u8bf4');
                    c = c.replace(/\u592a\u597d\u5403\u4e86/g, '\u7092\u9e21\u597d\u6b21\u7684\u8bf4');
                    c = c.replace(/\u771f\u597d/g, '\u771f\u597d\u7684\u8bf4');
                    c = c.replace(/\u771f\u68d2/g, '\u771f\u68d2\u7684\u8bf4');
                    c = c.replace(/\u771f\u5389\u5bb3/g, '\u771f\u5389\u5bb3\u7684\u8bf4');
                    c = c.replace(/\u771f\u53ef\u7231/g, '\u771f\u9614\u7231\u7684\u8bf4');



                    c = c.replace(/\u771f\u7684\u5417/g, '\u771f\u7684\u561b\uff1f');
                    c = c.replace(/\u771f\u7684\u5047\u7684/g, '\u771f\u7684\u5047\u7684\u54df\uff1f');
                    c = c.replace(/\u4e0d\u662f\u5427/g, '\u4e0d\u7d20\u53ed\uff1f');
                    c = c.replace(/\u5f00\u73a9\u7b11\u7684\u5427/g, '\u5f00\u73a9\u7b11\u7684\u53ed\uff1f');
                    c = c.replace(/\u9a97\u4eba\u7684\u5427/g, '\u9a97\u4eba\u7684\u53ed\uff1f');
                    c = c.replace(/\u4f60\u8bf4\u5462/g, '\u4e43\u8bf4\u634f\uff1f');
                    c = c.replace(/\u4f60\u8bf4\u5bf9\u5427/g, '\u4e43\u8bf4\u5bf9\u53ed\uff1f');
                    c = c.replace(/\u662f\u4e0d\u662f\u54e6/g, '\u7d20\u4e0d\u7d20\u54df\uff1f');
                    c = c.replace(/\u4f60\u786e\u5b9a/g, '\u4e43\u786e\u5b9a\u55b5\uff1f');
                    c = c.replace(/\u771f\u7684\uff1f/g, '\u771f\u7684\u55b5\uff1f');





                    c = c.replace(/\u544a\u8bc9/g, '\u544a\u8bc9\u8bc9');
                    c = c.replace(/\u89c9\u5f97/g, '\u89c9\u5f97\u55b5');
                    c = c.replace(/\u770b\u5230/g, '\u7784\u5230');
                    c = c.replace(/\u542c\u5230/g, '\u542c\u5230\u55b5');
                    c = c.replace(/\u95fb\u5230/g, '\u95fb\u5230\u55b5');
                    c = c.replace(/\u78b0\u5230/g, '\u78b0\u5230\u55b5');
                    c = c.replace(/\u62ff\u5230/g, '\u62ff\u5230\u55b5');
                    c = c.replace(/\u627e\u5230/g, '\u627e\u5230\u55b5');
                    c = c.replace(/\u6536\u5230/g, '\u6536\u5230\u55b5');
                    c = c.replace(/\u8bf4\u5230/g, '\u8bf4\u5230\u55b5');
                    c = c.replace(/\u722c\u5230/g, '\u722c\u5230\u55b5');
                    c = c.replace(/\u8dd1\u5230/g, '\u8dd1\u5230\u55b5');
                    c = c.replace(/\u6765\u5230/g, '\u6765\u5230\u55b5');
                    c = c.replace(/\u56de\u5230/g, '\u56de\u5230\u55b5');
                    c = c.replace(/\u8d70\u5230/g, '\u8d70\u5230\u55b5');
                    c = c.replace(/\u5750\u5230/g, '\u5750\u5230\u55b5');
                    c = c.replace(/\u770b\u5230\u55b5/g, '\u7784\u5230');
                    c = c.replace(/\u6709\u6ca1\u6709\u55b5/g, '\u6709\u6728\u6709');
                    c = c.replace(/\u597d\u50cf\u662f/g, '\u597d\u50cf\u7d20');
                    c = c.replace(/\u5c31\u50cf\u662f/g, '\u5c31\u50cf\u7d20');
                    c = c.replace(/\u611f\u89c9\u662f/g, '\u611f\u89c9\u7d20');
                    c = c.replace(/\u8fd9\u662f/g, '\u4ecb\u7d20');
                    c = c.replace(/\u90a3\u662f/g, '\u8fa3\u7d20');
                    c = c.replace(/\u7b97\u662f\u5427/g, '\u7b97\u7d20\u53ed');
                    c = c.replace(/\u5f53\u7136\u662f/g, '\u5f53\u7136\u7d20');
                    c = c.replace(/\u80af\u5b9a\u662f/g, '\u80af\u5b9a\u7d20');
                    c = c.replace(/\u5176\u5b9e\u662f/g, '\u5176\u5b9e\u7d20');
                    c = c.replace(/\u539f\u672c\u662f/g, '\u539f\u672c\u7d20');
                    c = c.replace(/\u5e94\u8be5\u662f/g, '\u5e94\u8be5\u7d20');
                    c = c.replace(/\u53ef\u80fd\u662f/g, '\u53ef\u80fd\u7d20');
                    c = c.replace(/\u5927\u6982\u662f/g, '\u5927\u6982\u7d20');
                    c = c.replace(/\u5b8c\u5168\u662f/g, '\u5b8c\u5168\u7d20');
                    c = c.replace(/\u6839\u672c\u662f/g, '\u6839\u672c\u7d20');
                    c = c.replace(/\u660e\u660e/g, '\u660e\u660e\u55b5');
                    c = c.replace(/\u521a\u521a/g, '\u521a\u521a\u54d2');
                    c = c.replace(/\u65b9\u624d/g, '\u65b9\u624d\u54d2');
                    c = c.replace(/\u8fdf\u65e9/g, '\u8fdf\u65e9\u55b5');
                    c = c.replace(/\u65e9\u665a/g, '\u65e9\u665a\u55b5');
                    c = c.replace(/\u7b97\u4e86\u5566/g, '\u7b97\u5566');
                    c = c.replace(/\u597d\u4e86\u5566/g, '\u597d\u5566');
                    c = c.replace(/\u5bf9\u4e86\u5566/g, '\u5bf9\u5566');
                    c = c.replace(/\u4ec0\u4e48/g, '\u795e\u9a6c');



                    c = c.replace(/^\u54c7\u585e/, '\u54c7\u567b\u55b5');
                    c = c.replace(/^\u545c\u54c7/, '\u545c\u54c7\u54c7');
                    c = c.replace(/^\u5427\u5527/, '\u5427\u5527\u5427\u5527');
                    c = c.replace(/^\u5494\u5693/, '\u5494\u5693\u5494\u5693');
                    c = c.replace(/^\u53ee\u549a/, '\u53ee\u549a\u55b5');
                    c = c.replace(/^\u5495\u565c/, '\u5495\u565c\u5495\u565c');
                    c = c.replace(/^\u5495\u561f/, '\u5495\u561f\u5495\u561f');
                    c = c.replace(/^\u547c\u565c/, '\u547c\u565c\u547c\u565c');
                    c = c.replace(/^\u5494\u5693/, '\u5494\u5693\u55b5');
                    c = c.replace(/^\u561b\u561b/, '\u561b\u561b\u55b5');
                    c = c.replace(/^\u597d\u5566\u597d\u5566/g, '\u597d\u54d2\u597d\u54d2');
                    c = c.replace(/^\u884c\u4e86\u884c\u4e86/g, '\u884c\u54d2\u884c\u54d2');
                    c = c.replace(/^\u77e5\u9053\u5566\u77e5\u9053\u5566/g, '\u77e5\u9053\u5566\u77e5\u9053\u5566');
                    c = c.replace(/^\u6765\u5566\u6765\u5566/g, '\u6765\u55b5\u6765\u55b5');
                    c = c.replace(/^\u53bb\u5566\u53bb\u5566/g, '\u53bb\u55b5\u53bb\u55b5');
                    c = c.replace(/^\u5bf9\u5566\u5bf9\u5566/g, '\u5bf9\u55b5\u5bf9\u55b5');
                    c = c.replace(/^\u5566\u5566\u5566/g, '\u5566\u5566\u55b5');
                    c = c.replace(/^\u54a6/, '\u54a6\u55b5');
                    c = c.replace(/^\u5466/, '\u5466\u55b5');
                    c = c.replace(/^\u54c8/, '\u54c8\u55b5');
                    c = c.replace(/^\u563f/, '\u563f\u563f\u55b5');
                    c = c.replace(/^\u5582/, '\u5582\u55b5');



                    c = c.replace(/\u7ffb(\u7bb1\u5012\u67dc|\u6765\u8986\u53bb|\u8eab)/g, '\u7ffb\u7ffb$1');
                    c = c.replace(/\u627e(\u5230|\u4e86|\u4e1c\u897f)/g, '\u627e\u627e$1');
                    c = c.replace(/\u52a8(\u8d77\u6765|\u4e86)/g, '\u52a8\u52a8$1');
                    c = c.replace(/\u8dd1(\u8fc7\u6765|\u8fc7\u53bb|\u4e86|\u6b65)/g, '\u8dd1\u8dd1$1');
                    c = c.replace(/\u8df3(\u8d77\u6765|\u8fc7\u53bb|\u4e86|\u821e)/g, '\u8df3\u8df3$1');
                    c = c.replace(/\u8d70(\u8fc7\u6765|\u8fc7\u53bb|\u4e86|\u8def)/g, '\u8d70\u8d70$1');
                    c = c.replace(/\u505c(\u4e0b|\u6b62)/g, '\u505c\u505c$1');
                    c = c.replace(/\u7ad9(\u8d77\u6765|\u7740|\u5728)/g, '\u7ad9\u7ad9$1');
                    c = c.replace(/\u8ddf(\u7740|\u4e0a|\u6211|\u4ed6)/g, '\u8ddf\u8ddf$1');
                    c = c.replace(/\u966a(\u7740|\u4f34)/g, '\u966a\u966a$1');
                    c = c.replace(/\u8ffd(\u4e0a|\u8d76)/g, '\u8ffd\u8ffd$1');
                    c = c.replace(/\u8d76(\u8def|\u7d27|\u5feb)/g, '\u8d76\u8d76$1');
                    c = c.replace(/\u51b2(\u950b|\u523a|\u554a)/g, '\u51b2\u51b2$1');
                    c = c.replace(/\u5954(\u8dd1|\u8d70|\u5411)/g, '\u5954\u5954$1');
                    c = c.replace(/\u9a91(\u9a6c|\u8f66|\u884c)/g, '\u9a91\u9a91$1');
                    c = c.replace(/\u5f00(\u8f66|\u95e8|\u59cb|\u5fc3|\u5f20)/g, '\u5f00\u5f00$1');
                    c = c.replace(/\u5173(\u95e8|\u7a97|\u5fc3)/g, '\u5173\u5173$1');
                    c = c.replace(/\u5199(\u5b57|\u4fe1|\u6587\u7ae0|\u4f5c\u4e1a)/g, '\u5199\u5199$1');
                    c = c.replace(/\u753b(\u753b|\u56fe|\u50cf)/g, '\u753b\u753b$1');
                    c = c.replace(/\u8bfb(\u4e66|\u4fe1|\u6587\u7ae0)/g, '\u8bfb\u8bfb$1');
                    c = c.replace(/\u5531(\u6b4c|\u620f)/g, '\u5531\u5531$1');
                    c = c.replace(/\u8df3(\u821e|\u9ad8|\u8fdc)/g, '\u8df3\u8df3$1');
                    c = c.replace(/\u73a9(\u800d|\u4e50|\u6e38\u620f)/g, '\u73a9\u73a9$1');
                    c = c.replace(/\u7b11(\u5bb9|\u563b|\u54c8|\u4e86)/g, '\u7b11\u7b11$1');
                    c = c.replace(/\u54ed(\u6ce3|\u4e86|\u58f0)/g, '\u54ed\u54ed$1');
                    c = c.replace(/\u53eb(\u58f0|\u4e86|\u9192|\u5524)/g, '\u53eb\u53eb$1');
                    c = c.replace(/\u558a(\u58f0|\u4e86|\u53eb)/g, '\u558a\u558a$1');
                    c = c.replace(/\u8bf4(\u8bdd|\u9053|:)/g, '\u8bf4\u8bf4$1');
                    c = c.replace(/\u8bb2(\u8bdd|\u9053|\u6545\u4e8b)/g, '\u8bb2\u8bb2$1');
                    c = c.replace(/\u95ee(\u5019|\u95ee\u9898|\u8def)/g, '\u95ee\u95ee$1');
                    c = c.replace(/\u7b54(\u5e94|\u8bdd|\u6848)/g, '\u7b54\u7b54$1');
                    c = c.replace(/\u4e70(\u5355|\u4e1c\u897f|\u83dc|\u7968)/g, '\u4e70\u4e70$1');
                    c = c.replace(/\u5356(\u4e1c\u897f|\u7968)/g, '\u5356\u5356$1');
                    c = c.replace(/\u7a7f(\u8863\u670d|\u978b|\u6234)/g, '\u7a7f\u7a7f$1');
                    c = c.replace(/\u8131(\u8863\u670d|\u978b|\u5e3d)/g, '\u8131\u8131$1');
                    c = c.replace(/\u6234(\u5e3d\u5b50|\u773c\u955c|\u624b\u5957)/g, '\u6234\u6234$1');
                    c = c.replace(/\u6d17(\u6fa1|\u624b|\u8138|\u8863\u670d|\u5934)/g, '\u6d17\u6d17$1');
                    c = c.replace(/\u5237(\u7259|\u65b0|\u978b)/g, '\u5237\u5237$1');



                    c = c.replace(/\u624b\u624b/g, '\u624b\u624b');
                    c = c.replace(/\u811a\u811a/g, '\u811a\u811a');
                    c = c.replace(/\u8138\u8138/g, '\u8138\u8138');
                    c = c.replace(/\u5634\u5634/g, '\u5634\u5634');
                    c = c.replace(/\u9f3b\u9f3b/g, '\u9f3b\u9f3b');
                    c = c.replace(/\u773c\u773c/g, '\u773c\u773c');
                    c = c.replace(/\u8033\u8033/g, '\u8033\u8033');
                    c = c.replace(/\u5934\u5934/g, '\u5934\u5934');
                    c = c.replace(/\u809a\u809a/g, '\u809a\u809a');
                    c = c.replace(/\u817f\u817f/g, '\u817f\u817f');
                    c = c.replace(/\u722a\u722a/g, '\u722a\u722a');
                    c = c.replace(/\u6307\u6307/g, '\u6307\u6307');
                    c = c.replace(/\u80cc\u80cc/g, '\u80cc\u80cc');
                    c = c.replace(/\u8170\u8170/g, '\u8170\u8170');
                    c = c.replace(/\u5c41\u5c41/g, '\u5c41\u5c41');
                    c = c.replace(/\u80a9\u80a9/g, '\u80a9\u80a9');
                    c = c.replace(/\u8116\u5b50/g, '\u8116\u51e0');
                    c = c.replace(/\u8fab\u5b50/g, '\u5c0f\u8fab\u8fab');
                    c = c.replace(/\u5934\u53d1/g, '\u6bdb\u6bdb');
                    c = c.replace(/\u6307\u7532/g, '\u6307\u7532\u7532');



                    c = c.replace(/\u7c73\u7c73/g, '\u7c73\u7c73');
                    c = c.replace(/\u9762\u9762/g, '\u9762\u9762');
                    c = c.replace(/\u83dc\u83dc/g, '\u83dc\u83dc');
                    c = c.replace(/\u8089\u8089/g, '\u8089\u8089');
                    c = c.replace(/\u86cb\u86cb/g, '\u86cb\u86cb');
                    c = c.replace(/\u8c46\u8c46/g, '\u8c46\u8c46');
                    c = c.replace(/\u74dc\u74dc/g, '\u74dc\u74dc');
                    c = c.replace(/\u82b1\u82b1/g, '\u82b1\u82b1');
                    c = c.replace(/\u4e09\u660e\u6cbb/g, '\u4e09\u660e\u6cbb\u6cbb');
                    c = c.replace(/\u6c49\u5821/g, '\u6c49\u5b9d\u5b9d');
                    c = c.replace(/\u85af\u6761/g, '\u85af\u6761\u6761');
                    c = c.replace(/\u62ab\u8428/g, '\u62ab\u8428\u8428');
                    c = c.replace(/\u5bff\u53f8/g, '\u5bff\u53f8\u53f8');
                    c = c.replace(/\u62c9\u9762/g, '\u62c9\u9762\u9762');
                    c = c.replace(/\u997a\u5b50/g, '\u997a\u51e0\u51e0');
                    c = c.replace(/\u5305\u5b50/g, '\u5305\u5305\u51e0');
                    c = c.replace(/\u6c64\u5706/g, '\u6c64\u5706\u5706');
                    c = c.replace(/\u7cbd\u5b50/g, '\u7cbd\u51e0\u51e0');
                    c = c.replace(/\u6708\u997c/g, '\u6708\u997c\u997c');
                    c = c.replace(/\u9178\u5976/g, '\u9178\u5976\u5976');
                    c = c.replace(/\u679c\u6c41/g, '\u679c\u6c41\u6c41');
                    c = c.replace(/\u53ef\u4e50/g, '\u5feb\u4e50\u6c34');
                    c = c.replace(/\u96ea\u78a7/g, '\u96ea\u78a7\u78a7');
                    c = c.replace(/\u897f\u74dc/g, '\u897f\u722a\u722a');
                    c = c.replace(/\u8349\u8393/g, '\u8393\u8393');
                    c = c.replace(/\u8461\u8404/g, '\u8404\u8404');
                    c = c.replace(/\u9999\u8549/g, '\u8549\u8549');
                    c = c.replace(/\u82f9\u679c/g, '\u679c\u679c');
                    c = c.replace(/\u6a58\u5b50/g, '\u6a58\u51e0\u51e0');
                    c = c.replace(/\u6843\u5b50/g, '\u6843\u51e0\u51e0');



                    c = c.replace(/\u65f6\u5019/g, '\u65f6\u5019\u55b5');
                    c = c.replace(/\u90a3\u65f6/g, '\u90a3\u4f1a\u513f\u55b5');
                    c = c.replace(/\u8fd9\u65f6/g, '\u8fd9\u4f1a\u513f\u55b5');
                    c = c.replace(/\u521a\u624d/g, '\u521a\u521a\u54d2');
                    c = c.replace(/\u56de\u5934/g, '\u56de\u5934\u55b5');
                    c = c.replace(/\u6539\u5929/g, '\u6539\u5929\u55b5');
                    c = c.replace(/\u4e0b\u6b21/g, '\u4e0b\u6b21\u55b5');
                    c = c.replace(/\u518d\u6b21/g, '\u518d\u6b21\u55b5');
                    c = c.replace(/\u91cd\u65b0/g, '\u91cd\u65b0\u55b5');
                    c = c.replace(/\u5c31\u8981/g, '\u5c31\u8981\u55b5');
                    c = c.replace(/\u5feb\u8981/g, '\u5feb\u5feb\u55b5');
                    c = c.replace(/\u6b63\u5728/g, '\u6b63\u5728\u55b5');
                    c = c.replace(/\u5df2\u7ecf/g, '\u5df2\u7ecf\u5566\u55b5');
                    c = c.replace(/\u5c31\u8981!/g, '\u5c31\u8981\u5230\u4e86\u55b5');



                    c = c.replace(/\u4e0d\u8981([\u4e86\u5566\u7684])/g, '\u8868$1');
                    c = c.replace(/\u4e0d\u884c/g, '\u4e0d\u884c\u5566');
                    c = c.replace(/\u4e0d\u53ef\u4ee5/g, '\u4e0d\u9614\u4ee5\u55b5');
                    c = c.replace(/\u53ef\u4ee5\u5417/g, '\u9614\u4ee5\u561b');
                    c = c.replace(/\u6ca1\u5173\u7cfb/g, '\u6ca1\u4e8b\u54d2');
                    c = c.replace(/\u4e0d\u8981\u7d27/g, '\u6ca1\u5173\u7cfb\u54d2');
                    c = c.replace(/\u6211\u6765\u4e86/g, '\u54b1\u6765\u5566');
                    c = c.replace(/\u8981\u8d70\u4e86/g, '\u8981\u8d70\u5566');
                    c = c.replace(/\u8981\u7761\u4e86/g, '\u8981\u788e\u5566');
                    c = c.replace(/\u7761\u89c9/g, '\u788e\u89c9');
                    c = c.replace(/\u5403\u996d/g, '\u6b21\u996d');
                    c = c.replace(/\u559d\u6c34/g, '\u6c34\u6c34');
                    c = c.replace(/\u597d\u997f/g, '\u997f\u997f');
                    c = c.replace(/\u597d\u9971/g, '\u9971\u9971');
                    c = c.replace(/\u597d\u56f0/g, '\u56f0\u56f0');
                    c = c.replace(/\u597d\u7d2f/g, '\u7d2f\u7d2f');
                    c = c.replace(/\u9a6c\u4e0a\u6765/g, '\u9a91\u9a6c\u6765');
                    c = c.replace(/\u9a6c\u4e0a\u5230/g, '\u9a91\u9a6c\u5230');
                    c = c.replace(/\u7b49\u7b49\u6211/g, '\u7b49\u7b49\u54b1\u55b5');
                    c = c.replace(/\u5feb\u770b/g, '\u5feb\u7784');
                    c = c.replace(/\u5feb\u70b9/g, '\u5feb\u5feb');
                    c = c.replace(/\u600e\u4e48\u8bf4/g, '\u80bf\u4e48\u55e6');
                    c = c.replace(/\u662f\u8bf4/g, '\u7d20\u8bf4');
                    c = c.replace(/\u8bf4($|[\uff0c,\u3002\uff01\uff1f])/g, '\u55e6$1');
                    c = c.replace(/\u522b\u4eba/g, '\u522b\u4eba\u5bb6');
                    c = c.replace(/\u5927\u4eba/g, '\u5927\u4eba\u6851');
                    c = c.replace(/\u5c0f(\u5b69|\u5b69\u5b50)/g, '\u5c0f\u76c6\u53cb');
                    c = c.replace(/\u7537\u5b69/g, '\u7537\u5a03');
                    c = c.replace(/\u5973\u5b69/g, '\u5973\u5a03');



                    c = c.replace(/\u7537\u670b\u53cb/g, '\u7537\u76c6\u53cb');
                    c = c.replace(/\u5973\u670b\u53cb/g, '\u5973\u76c6\u53cb');
                    c = c.replace(/\u8001\u516c/g, '\u8001\u653b');
                    c = c.replace(/\u8001\u5a46/g, '\u8001\u7834');
                    c = c.replace(/\u5e08\u5085/g, '\u5e08\u7236\u7236');
                    c = c.replace(/\u5f92\u5f1f/g, '\u5f92\u5f1f\u5f1f');
                    c = c.replace(/\u8001\u5e08/g, '\u8001\u4e1d\u513f');
                    c = c.replace(/\u5148\u751f/g, '\u5148\u68ee');
                    c = c.replace(/\u5c0f\u59d0/g, '\u5c0f\u89e3\u89e3');
                    c = c.replace(/\u516c\u4e3b/g, '\u516c\u4e3e');
                    c = c.replace(/\u738b\u5b50/g, '\u738b\u5b50\u6837');
                    c = c.replace(/\u5973\u738b/g, '\u5973\u738b\u6837');
                    c = c.replace(/\u9b54\u738b/g, '\u9b54\u738b\u6837');
                    c = c.replace(/\u5929\u4f7f/g, '\u4f7f\u4f7f');
                    c = c.replace(/\u6076\u9b54/g, '\u5c0f\u6076\u9b54');
                    c = c.replace(/\u7cbe\u7075/g, '\u5c0f\u7cbe\u7075');
                    c = c.replace(/\u5996\u602a/g, '\u5996\u602a\u541b');
                    c = c.replace(/\u795e\u4ed9/g, '\u795e\u4ed9\u55b5');



                    c = c.replace(/\u5e3d\u5b50/g, '\u5e3d\u7eb8');
                    c = c.replace(/\u773c\u955c/g, '\u955c\u955c');
                    c = c.replace(/\u80cc\u5305/g, '\u5305\u5305');
                    c = c.replace(/\u4e66\u5305/g, '\u4e66\u4e66');
                    c = c.replace(/\u624b\u673a/g, '\u673a\u673a');
                    c = c.replace(/\u7535\u8111/g, '\u8111\u8111');
                    c = c.replace(/\u952e\u76d8/g, '\u76d8\u76d8');
                    c = c.replace(/\u9f20\u6807/g, '\u6807\u6807');
                    c = c.replace(/\u684c\u5b50/g, '\u684c\u684c');
                    c = c.replace(/\u6905\u5b50/g, '\u6905\u6905');
                    c = c.replace(/\u676f\u5b50/g, '\u676f\u676f');
                    c = c.replace(/\u52fa\u5b50/g, '\u52fa\u52fa');
                    c = c.replace(/\u7b77\u5b50/g, '\u7b77\u7b77');
                    c = c.replace(/\u6795\u5934/g, '\u6795\u6795');
                    c = c.replace(/\u88ab\u5b50/g, '\u88ab\u88ab');
                    c = c.replace(/\u6bef\u5b50/g, '\u6bef\u6bef');
                    c = c.replace(/\u7259\u5237/g, '\u7259\u7259');
                    c = c.replace(/\u6bdb\u5dfe/g, '\u5dfe\u5dfe');
                    c = c.replace(/\u80a5\u7682/g, '\u7682\u7682');
                    c = c.replace(/\u6d17\u53d1\u6c34/g, '\u6c34\u6c34');



                    c = c.replace(/\u8f9b\u82e6\u4e86/g, '\u8f9b\u82e6\u5566');
                    c = c.replace(/\u6536\u5230/g, '\u6536\u5230\u55b5');
                    c = c.replace(/\u77e5\u9053\u4e86/g, '\u77e5\u9053\u5566');
                    c = c.replace(/\u660e\u767d\u4e86/g, '\u660e\u767d\u5566');
                    c = c.replace(/\u7b49\u4e00\u4e0b/g, '\u7b49\u4e0b\u55b5');
                    c = c.replace(/\u4e00\u8d77\u53bb/g, '\u4e00\u8d77\u53bb\u55b5');
                    c = c.replace(/\u4e00\u8d77\u73a9/g, '\u4e00\u8d77\u73a9\u55b5');
                    c = c.replace(/\u73a9\u6e38\u620f/g, '\u73a9\u6e38\u620f\u55b5');
                    c = c.replace(/\u51fa\u53d1/g, '\u51fa\u53d1\u55b5');
                    c = c.replace(/\u96c6\u5408/g, '\u96c6\u5408\u55b5');
                    c = c.replace(/\u4f11\u606f/g, '\u4f11\u606f\u55b5');
                    c = c.replace(/\u62dc\u62dc/g, '\u63b0\u63b0\u55b5');
                    c = c.replace(/\u518d\u89c1/g, '\u518d\u4f1a\u55b5');
                    c = c.replace(/\u665a\u5b89/g, '\u665a\u5b89\u55b5');
                    c = c.replace(/\u65e9\u5b89/g, '\u65e9\u5b89\u55b5');
                    c = c.replace(/\u5348\u5b89/g, '\u5348\u5b89\u55b5');
                    c = c.replace(/\u597d\u4e45\u4e0d\u89c1/g, '\u597d\u60f3\u4e43\u4eec\u55b5');
                    c = c.replace(/\u4f60\u5728\u5417/g, '\u4e43\u5728\u55b5');
                    c = c.replace(/\u5728\u5e72\u561b/g, '\u5728\u5e72\u5565\u55b5');
                    c = c.replace(/\u53bb\u4e0d\u53bb/g, '\u53bb\u4e0d\u53bb\u55b5');
                    c = c.replace(/\u597d\u4e0d\u597d/g, '\u597d\u4e0d\u5566');
                    c = c.replace(/\u884c\u4e0d\u884c/g, '\u884c\u4e0d\u884c\u55b5');



                    c = c.replace(/\u4e0d\u7528\u4e86/g, '\u4e0d\u7528\u5566');
                    c = c.replace(/\u4e0d\u8981\u4e86/g, '\u4e0d\u8981\u5566');
                    c = c.replace(/\u4e0d\u60f3\u4e86/g, '\u4e0d\u60f3\u5566');
                    c = c.replace(/\u53ef\u4ee5\u4e86/g, '\u9614\u4ee5\u5566');
                    c = c.replace(/\u597d\u7684\u5427/g, '\u597d\u53ed');
                    c = c.replace(/\u884c\u5427/g, '\u884c\u53ed');
                    c = c.replace(/\u55ef\u55ef/g, '\u55ef\u5450');
                    c = c.replace(/\u7b97\u4e86\u5427/g, '\u7b97\u5566\u53ed');
                    c = c.replace(/\u968f\u4fbf/g, '\u968f\u610f\u5566');
                    c = c.replace(/\u65e0\u6240\u8c13/g, '\u65e0\u6240\u8c13\u7684\u8bf4');
                    c = c.replace(/\u90fd\u53ef\u4ee5/g, '\u90fd\u9614\u4ee5\u7684\u8bf4');



                    c = c.replace(/\u6f02\u4eae\u6ef4/g, '\u6f02\u917f\u6ef4');
                    c = c.replace(/\u597d\u770b\u6ef4/g, '\u597d\u55b5\u770b\u6ef4');
                    c = c.replace(/\u7f8e\u4e3d\u6ef4/g, '\u7f8e\u55b5\u6ef4');
                    c = c.replace(/\u53ef\u7231\u6ef4/g, '\u9614\u7231\u6ef4');
                    c = c.replace(/\u806a\u660e\u6ef4/g, '\u806a\u660e\u54d2');
                    c = c.replace(/\u52aa\u529b\u6ef4/g, '\u52aa\u529b\u54d2');
                    c = c.replace(/\u8ba4\u771f\u6ef4/g, '\u8ba4\u771f\u54d2');
                    c = c.replace(/\u68d2\u68d2\u6ef4/g, '\u68d2\u68d2\u54d2');
                    c = c.replace(/\u6162\u6162\u6ef4/g, '\u6162\u6162\u54d2');
                    c = c.replace(/\u5feb\u5feb\u6ef4/g, '\u5feb\u5feb\u54d2');
                    c = c.replace(/\u8f7b\u8f7b\u6ef4/g, '\u8f7b\u8f7b\u54d2');
                    c = c.replace(/\u597d\u597d\u6ef4/g, '\u597d\u597d\u54d2');
                    c = c.replace(/\u9ad8\u5174/g, '\u9ad8\u5174\u5174');
                    c = c.replace(/\u5174\u594b/g, '\u5174\u594b\u594b');
                    c = c.replace(/\u6fc0\u52a8/g, '\u6fc0\u52a8\u52a8');
                    c = c.replace(/\u60ca\u8bb6/g, '\u60ca\u8bb6\u8bb6');
                    c = c.replace(/\u614c\u5f20/g, '\u614c\u5f20\u5f20');
                    c = c.replace(/\u5306\u5fd9/g, '\u5306\u5306\u5fd9');
                    c = c.replace(/\u6025\u5fd9/g, '\u6025\u6025\u55b5');



                    c = c.replace(/\u5806\u5806/g, '\u5806\u5806');
                    c = c.replace(/\u6316\u6316/g, '\u6316\u6316');
                    c = c.replace(/\u8e29\u8e29/g, '\u8e29\u8e29');
                    c = c.replace(/\u8e22\u8e22/g, '\u8e22\u8e22');
                    c = c.replace(/\u8e66\u8e66/g, '\u8e66\u8e66');
                    c = c.replace(/\u6253\u6c34\u4ed7/g, '\u6253\u6c34\u6c34\u4ed7');
                    c = c.replace(/\u6cfc\u6c34/g, '\u6cfc\u6c34\u6c34');
                    c = c.replace(/\u620f\u6c34/g, '\u620f\u6c34\u6c34');
                    c = c.replace(/\u51b2\u6d6a/g, '\u51b2\u51b2\u6d6a');
                    c = c.replace(/\u6f5c\u6c34/g, '\u6f5c\u6f5c\u6c34');
                    c = c.replace(/\u6361\u8d1d\u58f3/g, '\u6361\u8d1d\u8d1d\u58f3');
                    c = c.replace(/\u5806\u6c99\u5821/g, '\u5806\u6c99\u6c99\u5821');
                    c = c.replace(/\u6652\u592a\u9633/g, '\u6652\u55b5\u592a\u9633');
                    c = c.replace(/\u5439\u6d77\u98ce/g, '\u5439\u55b5\u6d77\u98ce');
                    c = c.replace(/\u770b\u65e5\u843d/g, '\u770b\u55b5\u65e5\u843d');
                    c = c.replace(/\u770b\u65e5\u51fa/g, '\u770b\u55b5\u65e5\u51fa');
                    c = c.replace(/\u6570\u661f\u661f/g, '\u6570\u661f\u661f\u661f');
                    c = c.replace(/\u770b\u98ce\u666f/g, '\u770b\u55b5\u98ce\u666f');



                    c = c.replace(/\u5c0f\u72d7/g, '\u72d7\u52fe');
                    c = c.replace(/\u5c0f\u732b/g, '\u5c0f\u732b\u54aa');
                    c = c.replace(/\u5c0f\u5154/g, '\u5c0f\u5154\u53fd');
                    c = c.replace(/\u5c0f\u9e1f/g, '\u5c0f\u9e1f\u557e');
                    c = c.replace(/\u5c0f\u9c7c/g, '\u9c7c\u9c7c');
                    c = c.replace(/\u5c0f\u9e2d/g, '\u9e2d\u9e2d');
                    c = c.replace(/\u5c0f\u9e21/g, '\u9e21\u51e0');
                    c = c.replace(/\u5c0f\u732a/g, '\u732a\u732a');
                    c = c.replace(/\u5c0f\u7f8a/g, '\u7f8a\u54a9\u54a9');
                    c = c.replace(/\u5c0f\u9a6c/g, '\u9a6c\u51e0\u51e0');
                    c = c.replace(/\u5c0f\u7334/g, '\u7334\u51e0\u51e0');
                    c = c.replace(/\u5c0f\u677e\u9f20/g, '\u677e\u9f20\u51e0');
                    c = c.replace(/\u5c0f\u523a\u732c/g, '\u523a\u732c\u51e0');
                    c = c.replace(/\u5c0f\u72d0\u72f8/g, '\u72d0\u51e0\u51e0');
                    c = c.replace(/\u5c0f\u718a\u732b/g, '\u718a\u732b\u55b5');
                    c = c.replace(/\u5c0f\u4f01\u9e45/g, '\u4f01\u9e45\u9e45');



                    c = c.replace(/\u5934\u4e0a/g, '\u8111\u888b\u4e0a');
                    c = c.replace(/\u811a\u4e0b/g, '\u811a\u811a\u8fb9');
                    c = c.replace(/\u624b\u4e0a/g, '\u624b\u624b\u8fb9');
                    c = c.replace(/\u8eab\u4e0a/g, '\u8eab\u8eab\u4e0a');
                    c = c.replace(/\u5fc3\u91cc/g, '\u5fc3\u5fc3\u91cc');
                    c = c.replace(/\u68a6\u91cc/g, '\u68a6\u68a6\u91cc');
                    c = c.replace(/\u5929\u4e0a/g, '\u5929\u7a7a\u55b5');
                    c = c.replace(/\u5730\u4e0a/g, '\u5730\u5730\u4e0a');
                    c = c.replace(/\u684c\u4e0a/g, '\u684c\u684c\u4e0a');
                    c = c.replace(/\u5e8a\u4e0a/g, '\u5e8a\u5e8a\u4e0a');
                    c = c.replace(/\u6c99\u53d1\u4e0a/g, '\u6c99\u6c99\u53d1\u4e0a');



                    c = c.replace(/\u597d\u8d5e/g, '\u7092\u9e21\u8d5e');
                    c = c.replace(/\u70b9\u8d5e/g, '\u70b9\u55b5\u8d5e');
                    c = c.replace(/\u6bd4\u5fc3/g, '\u7b14\u82af\u82af');
                    c = c.replace(/\u6492\u82b1/g, '\u6492\u55b5\u82b1');
                    c = c.replace(/\u9876\u9876/g, '\u9876\u9876\u9876');
                    c = c.replace(/\u6253\u5361/g, '\u6253\u55b5\u5361');
                    c = c.replace(/\u79cd\u8349/g, '\u79cd\u55b5\u8349');
                    c = c.replace(/\u62d4\u8349/g, '\u62d4\u55b5\u8349');
                    c = c.replace(/\u809d/g, '\u809d\u809d');
                    c = c.replace(/\u6c2a/g, '\u6c2a\u6c2a');
                    c = c.replace(/\u6b27/g, '\u6b27\u6b27');
                    c = c.replace(/\u975e/g, '\u975e\u975e');
                    c = c.replace(/\u8131\u975e/g, '\u8131\u975e\u5165\u6b27\u55b5');
                    c = c.replace(/\u5165\u6b27/g, '\u5165\u6b27\u55b5');
                    c = c.replace(/\u840c\u65b0/g, '\u840c\u840c\u65b0');
                    c = c.replace(/\u5927\u4f6c/g, '\u5927\u55b5\u8001');
                    c = c.replace(/\u840c\u5ba0/g, '\u840c\u5ba0\u5ba0');



                    c = c.replace(/\u55b5\u545c\u55b5/g, '\u55b5\u545c\u55b5\u545c');
                    c = c.replace(/\u55b5\u55b5\u53eb/g, '\u55b5\u55b5\u55b5\u53eb');
                    c = c.replace(/\u55b5\u55b5\u55b5/g, '\u55b5\u55b5\u55b5');
                    c = c.replace(/\u547c\u565c\u565c/g, '\u547c\u565c\u565c\u565c');
                    c = c.replace(/\u5495\u565c\u565c/g, '\u5495\u565c\u565c\u565c');
                    c = c.replace(/\u6253\u6eda\u6eda/g, '\u6253\u4e2a\u6eda\u6eda');
                    c = c.replace(/\u4f38\u61d2\u8170/g, '\u4f38\u4e2a\u55b5\u61d2\u8170');
                    c = c.replace(/\u8e29\u5976/g, '\u8e29\u5976\u5976\u55b5');
                    c = c.replace(/\u5f13\u80cc/g, '\u5f13\u55b5\u80cc');
                    c = c.replace(/\u70b8\u6bdb/g, '\u70b8\u6bdb\u6bdb\u55b5');
                    c = c.replace(/\u98de\u673a\u8033/g, '\u98de\u55b5\u673a\u8033');
                    c = c.replace(/\u63e3\u624b/g, '\u63e3\u624b\u624b\u55b5');
                    c = c.replace(/\u8214\u722a\u722a/g, '\u8214\u722a\u722a\u55b5');



                    c = c.replace(/\u6211\u4e0d\u77e5\u9053/g, '\u54b1\u4e0d\u51e0\u9053');
                    c = c.replace(/\u6211\u4e0d/g, '\u54b1\u4e0d');
                    c = c.replace(/\u6211\u6ca1/g, '\u54b1\u6ca1');
                    c = c.replace(/\u6211\u4e0d\u662f/g, '\u54b1\u4e0d\u7d20');
                    c = c.replace(/\u6211\u6ca1\u6709/g, '\u54b1\u59b9\u6cb9');
                    c = c.replace(/\u6211\u4e5f\u4e0d\u77e5\u9053/g, '\u54b1\u4e5f\u4e0d\u51e0\u9053');
                    c = c.replace(/\u6211\u4e0d\u7ba1/g, '\u54b1\u4e0d\u7ba1\u5566');
                    c = c.replace(/\u6211\u4e0d\u8981/g, '\u54b1\u4e0d\u8981\u561b');
                    c = c.replace(/\u6211\u4e0d\u542c/g, '\u54b1\u4e0d\u542c\u4e0d\u542c');
                    c = c.replace(/\u6211\u4e0d\u7406/g, '\u54b1\u4e0d\u7406\u4e43\u5566');
                    c = c.replace(/\u6211\u89c9\u5f97/g, '\u54b1\u89c9\u5f97\u55b5');
                    c = c.replace(/\u6211\u77e5\u9053/g, '\u54b1\u77e5\u9053\u54df');
                    c = c.replace(/\u6211\u660e\u767d/g, '\u54b1\u660e\u767d\u54df');
                    c = c.replace(/\u6211\u540c\u610f/g, '\u54b1\u540c\u610f\u54df');
                    c = c.replace(/\u6211\u8d5e\u6210/g, '\u54b1\u8d5e\u6210\u54df');
                    c = c.replace(/\u6211\u4fdd\u8bc1/g, '\u54b1\u4fdd\u8bc1\u54df');
                    c = c.replace(/\u6211\u53d1\u8a93/g, '\u54b1\u53d1\u8a93\u54df');
                    c = c.replace(/\u6211\u786e\u5b9a/g, '\u54b1\u786e\u5b9a\u54df');
                    c = c.replace(/\u90fd\u602a\u4f60/g, '\u90fd\u602a\u4e43\u55b5');
                    c = c.replace(/\u90fd\u662f\u4f60\u7684\u9519/g, '\u90fd\u7d20\u4e43\u6ef4\u9519\u55b5');
                    c = c.replace(/\u54fc(?![~])/, '\u54fc~');
                    c = c.replace(/\u5207(?![~])/, '\u5207~');
                    c = c.replace(/\u624d\u602a/g, '\u624d\u602a\u55b5');
                    c = c.replace(/\u9a97\u4eba/g, '\u9a97\u55b5');
                    c = c.replace(/\u4e0d\u4fe1/g, '\u4e0d\u4fe1\u55b5');
                    c = c.replace(/\u4e0d\u4fe1\u7b97\u4e86/g, '\u4e0d\u4fe1\u7b97\u5566\u55b5');
                    c = c.replace(/\u968f\u4fbf\u4f60/g, '\u968f\u4fbf\u4e43\u5566');
                    c = c.replace(/\u968f\u4f60\u4fbf/g, '\u968f\u4e43\u4fbf\u5566');
                    c = c.replace(/\u65e0\u6240\u8c13/g, '\u65e0\u55b5\u6240\u8c13');
                    c = c.replace(/\u5c0f\u610f\u601d/g, '\u5c0f\u610f\u601d\u5566');
                    c = c.replace(/\u6ca1\u95ee\u9898/g, '\u6ca1\u95ee\u9898\u54df');
                    c = c.replace(/\u5c0f\u4e8b\u4e00\u6869/g, '\u5c0f\u4e8b\u4e00\u6869\u54df');
                    c = c.replace(/\u4ea4\u7ed9\u6211/g, '\u4ea4\u7ed9\u54b1\u53ed');
                    c = c.replace(/\u8ba9\u6211\u8bd5\u8bd5/g, '\u8ba9\u54b1\u8bd5\u8bd5\u54df');
                    c = c.replace(/\u6211\u6765/g, '\u54b1\u6765');
                    c = c.replace(/\u6211\u80fd\u884c/g, '\u54b1\u80fd\u884c\u54df');
                    c = c.replace(/\u6211\u53ef\u4ee5/g, '\u54b1\u9614\u4ee5\u54df');
                    c = c.replace(/\u6211\u5389\u5bb3\u5427/g, '\u54b1\u5389\u5bb3\u53ed');
                    c = c.replace(/\u6211\u806a\u660e\u5427/g, '\u54b1\u806a\u660e\u53ed');
                    c = c.replace(/\u600e\u4e48\u6837\u5389\u5bb3\u5427/g, '\u80bf\u4e48\u6837\u5389\u5bb3\u53ed');
                    c = c.replace(/\u597d\u4e0d\u597d\u73a9/g, '\u597d\u4e0d\u597d\u73a9\u7684\u8bf4');
                    c = c.replace(/\u597d\u4e0d\u597d\u5403/g, '\u597d\u4e0d\u597d\u6b21\u7684\u8bf4');
                    c = c.replace(/\u597d\u4e0d\u597d\u770b/g, '\u597d\u4e0d\u597d\u770b\u6ef4\u8bf4');



                    c = c.replace(/\u6d77\u8fb9/g, '\u6d77\u6d77\u8fb9');
                    c = c.replace(/\u6c99\u6ee9/g, '\u6c99\u6c99\u6ee9');
                    c = c.replace(/\u6d77\u6d6a/g, '\u6d77\u6d6a\u6d6a');
                    c = c.replace(/\u6d77\u98ce/g, '\u6d77\u98ce\u98ce');
                    c = c.replace(/\u6d77\u6c34/g, '\u6d77\u6c34\u6c34');
                    c = c.replace(/\u5927\u6d77/g, '\u5927\u5927\u6d77');
                    c = c.replace(/\u9633\u5149/g, '\u9633\u5149\u5149');
                    c = c.replace(/\u65e5\u51fa/g, '\u65e5\u51fa\u51fa');
                    c = c.replace(/\u65e5\u843d/g, '\u65e5\u843d\u843d');
                    c = c.replace(/\u6708\u5149/g, '\u6708\u5149\u5149');
                    c = c.replace(/\u5fae\u98ce/g, '\u5fae\u5fae\u98ce');
                    c = c.replace(/\u6e05\u98ce/g, '\u6e05\u6e05\u98ce');
                    c = c.replace(/\u7ec6\u96e8/g, '\u7ec6\u7ec6\u96e8');





                    c = c.replace(/^\u597d[\u70e6\u7d2f\u51b7\u70ed]\uff01?/, '\u597d$1\u7684\u8bf4\uff01');
                    c = c.replace(/^\u597d[\u5403\u559d\u73a9\u770b\u542c]\uff01?/, '\u597d$1\u7684\u8bf4\uff01');
                    c = c.replace(/^\u597d[\u68d2\u5f3a\u5389\u5bb3\u53ef\u7231\u840c]\uff01?/, '\u7092\u9e21$1\u7684\u8bf4\uff01');
                    c = c.replace(/^\u592a[\u597d\u68d2\u5f3a\u5389\u5bb3\u53ef\u7231\u840c]\u5566\uff01?/, '\u7092\u9e21$1\u7684\u8bf4\uff01');
                    c = c.replace(/^\u592a[\u597d\u68d2\u5f3a\u5389\u5bb3]\u4e86[\uff01!]?/, '\u7092\u9e21$1\u7684\u8bf4\uff01');
                    c = c.replace(/^\u7b11\u6b7b[\u4e86]?[\uff01!]/, '\u7b11\u6b7b\u55b5\uff01');
                    c = c.replace(/^\u9189\u4e86[\uff01!]/, '\u9189\u5566\u9189\u5566\uff01');
                    c = c.replace(/^\u54ed\u4e86[\uff01!]/, '\u54ed\u54ed\u5566\uff01');
                    c = c.replace(/^\u88c2\u5f00[\u4e86]?[\uff01!]/, '\u88c2\u5f00\u55b5\uff01');
                    c = c.replace(/^\u9ebb\u4e86[\uff01!]/, '\u9ebb\u5566\u55b5\uff01');
                    c = c.replace(/^\u7d2f\u4e86[\uff01!]/, '\u7d2f\u7d2f\u5566\uff01');
                    c = c.replace(/^\u56f0\u4e86[\uff01!]/, '\u56f0\u56f0\u5566\uff01');
                    c = c.replace(/^\u997f\u4e86[\uff01!]/, '\u997f\u997f\u5566\uff01');
                    c = c.replace(/^\u9971\u4e86[\uff01!]/, '\u9971\u9971\u5566\uff01');



                    c = c.replace(/^\u641e\u4ec0\u4e48[\u554a\u5440]?[\uff1f!\uff1f!]/, '\u641e\u795e\u9a6c\u55b5\uff01');
                    c = c.replace(/^\u641e\u5565[\u554a\u5440]?[\uff1f\uff01]?/, '\u641e\u5565\u55b5\uff01');
                    c = c.replace(/^\u5e72\u561b[\u9e2d\u5440\u5566]?[\uff1f\uff01]?/, '\u5e72\u795e\u9a6c\u55b5\uff01');
                    c = c.replace(/^\u4ec0\u4e48\u9b3c[\u554a\u5440]?[\uff1f\uff01]?/, '\u795e\u9a6c\u9b3c\u55b5\uff01');
                    c = c.replace(/^\u4ec0\u4e48\u73a9\u610f[\u554a\u5440]?[\uff1f\uff01]?/, '\u795e\u9a6c\u73a9\u610f\u55b5\uff01');
                    c = c.replace(/^\u771f\u7684\u662f[\uff01!]/, '\u771f\u7d20\u54d2\uff01');
                    c = c.replace(/^\u771f\u662f\u7684[\uff01!]/, '\u771f\u7d20\u6ef4\uff01');
                    c = c.replace(/^\u670d\u4e86[\uff01!]/, '\u670d\u5566\u670d\u5566\uff01');
                    c = c.replace(/^\u65e0\u8bed[\u4e86]?[\uff01!]/, '\u65e0\u8bed\u55b5\uff01');
                    c = c.replace(/^\u7edd\u4e86[\uff01!]/, '\u7edd\u5566\u7edd\u5566\uff01');
                    c = c.replace(/^\u6551\u547d[\u554a\u5440]?[\uff01!]/, '\u6551\u547d\u55b5\uff01');
                    c = c.replace(/^\u5929\u54ea[\uff01!]/, '\u5929\u54ea\u55b5\uff01');
                    c = c.replace(/^\u6211\u7684\u5929[\uff01!]/, '\u5076\u6ef4\u5929\u55b5\uff01');
                    c = c.replace(/^\u5988\u5440[\uff01!]/, '\u5988\u9e2d\uff01');
                    c = c.replace(/^\u6211\u7684\u5988[\u5440]?[\uff01!]/, '\u5076\u6ef4\u5988\u9e2d\uff01');



                    c = c.replace(/^\u4e0d\u662f[\u5427\u53ed]?[\uff1f\uff01]?/, '\u4e0d\u7d20\u53ed\uff1f\uff01');
                    c = c.replace(/^\u4e0d\u662f\u5427[\uff1f\uff01]?/, '\u4e0d\u7d20\u53ed\uff1f\uff01');
                    c = c.replace(/^\u6709\u6ca1\u6709\u641e\u9519[\uff1f\uff01]?/, '\u6709\u6728\u6709\u641e\u9519\u55b5\uff1f\uff01');
                    c = c.replace(/^\u81f3\u4e8e\u5417[\uff1f?]/, '\u81f3\u4e8e\u55b5\uff1f');
                    c = c.replace(/^\u81f3\u4e8e\u4e48[\uff1f?]/, '\u81f3\u4e8e\u55b5\uff1f');
                    c = c.replace(/^\u8fc7\u5206[\u4e86]?[\uff01!\uff1f?]/, '\u8fc7\u5206\u55b5\uff01');
                    c = c.replace(/^\u53ef\u6076[\uff01!]/, '\u53ef\u6076\u55b5\uff01');



                    c = c.replace(/^\u5c31\u662f[\u8bf4]?[\u554a\u5440\u5450\u561b]?[\uff01!]?/, '\u5c31\u7d20\u8bf4\u55b5\uff01');
                    c = c.replace(/^\u5c31\u662f\u8bf4\u554a/, '\u5c31\u7d20\u8bf4\u55b5\uff01');
                    c = c.replace(/^\u786e\u5b9e[\uff01!]?/, '\u786e\u5b9e\u55b5\uff01');
                    c = c.replace(/^\u7684\u786e[\uff01!]?/, '\u7684\u786e\u55b5\uff01');
                    c = c.replace(/^\u6ca1\u9519[\uff01!]?/, '\u59b9\u9519\u55b5\uff01');
                    c = c.replace(/^\u53ef\u4e0d\u662f[\u5417\u4e48\u561b]?[\uff01!]?/, '\u53ef\u4e0d\u7d20\u55b5\uff01');
                    c = c.replace(/^\u8c01\u8bf4\u4e0d\u662f[\u5462]?[\uff01!]\uff1f/, '\u8c01\u8bf4\u4e0d\u7d20\u634f\uff01');
                    c = c.replace(/^\u6211\u4e5f[\u662f\u89c9\u5f97]?/, '\u54b1\u4e5f\u7d20');
                    c = c.replace(/^\u6211\u4e5f\u662f/, '\u54b1\u4e5f\u7d20');
                    c = c.replace(/^\u6211\u89c9\u5f97\u4e5f\u662f/, '\u54b1\u4e5f\u89c9\u5f97\u55b5');
                    c = c.replace(/^\u6211\u4e5f\u89c9\u5f97/, '\u54b1\u4e5f\u89c9\u5f97\u55b5');
                    c = c.replace(/^\u6211\u4e5f\u8fd9\u4e48\u60f3/, '\u54b1\u4e5f\u8fa3\u4e48\u60f3\u55b5');



                    c = c.replace(/^\u4e0d\u8fc7[\u554a\u5440\u561b]?\uff0c?/, '\u4e0d\u8fc7\u55b5\uff0c');
                    c = c.replace(/^\u4f46\u662f[\u5427\u561b]?\uff0c?/, '\u4f46\u7d20\u55b5\uff0c');
                    c = c.replace(/^\u53ef\u662f[\u5427\u561b]?\uff0c?/, '\u53ef\u7d20\u55b5\uff0c');
                    c = c.replace(/^\u7136\u540e[\u5427\u561b\u554a\u5440]?[\uff0c,]?/, '\u7136\u540e\u55b5\uff0c');
                    c = c.replace(/^\u7ed3\u679c[\u5427\u561b\u554a\u5440]?[\uff0c,]?/, '\u7ed3\u679c\u55b5\uff0c');
                    c = c.replace(/^\u4e8e\u662f[\u5427\u561b\u554a\u5440]?[\uff0c,]?/, '\u4e8e\u7d20\u55b5\uff0c');
                    c = c.replace(/^\u53cd\u6b63[\u5427\u561b\u554a\u5440]?[\uff0c,]?/, '\u53cd\u6b63\u55b5\uff0c');
                    c = c.replace(/^\u5176\u5b9e[\u5427\u561b\u554a\u5440]?[\uff0c,]?/, '\u5176\u5b9e\u7d20\uff0c');
                    c = c.replace(/^\u8bdd\u8bf4[\u56de\u6765]?[\uff0c,]?/, '\u8bdd\u8bf4\u55b5\uff0c');
                    c = c.replace(/^\u8bf4\u8d77\u6765[\uff0c,]?/, '\u8bf4\u8d77\u6765\u55b5\uff0c');
                    c = c.replace(/^\u603b\u4e4b[\uff0c,]?/, '\u603b\u4e4b\u55b5\uff0c');
                    c = c.replace(/^\u8bf4\u767d\u4e86[\uff0c,]?/, '\u8bf4\u767d\u4e86\u55b5\uff0c');
                    c = c.replace(/^\u6362\u53e5\u8bdd\u8bf4[\uff0c,]?/, '\u6362\u53e5\u8bdd\u55e6\u55b5\uff0c');
                    c = c.replace(/^\u6bd4\u5982\u8bf4[\u554a\u5440]?[\uff0c,]?/, '\u6bd4\u5982\u8bf4\u55b5\uff0c');



                    c = c.replace(/^\u5bf9\u4e86[\u554a\u5440]?[\uff0c,]?/, '\u5bf9\u4e86\u55b5\uff0c');
                    c = c.replace(/^\u90a3\u4e2a[\u5565\u561b]?[\uff0c,]?/, '\u8fa3\u4e2a\u55b5\uff0c');
                    c = c.replace(/^\u8fd9\u4e2a[\u561b\u5427]?[\uff0c,]?/, '\u4ecb\u4e2a\u561b\uff0c');
                    c = c.replace(/^\u6211\u8ddf\u4f60\u8bf4[\u554a\u5440]?[\uff0c,]?/, '\u54b1\u8ddf\u4e43\u55e6\u55b5\uff0c');
                    c = c.replace(/^\u6211\u8ddf\u4e43\u55e6/g, '\u54b1\u8ddf\u4e43\u55e6\u55b5');
                    c = c.replace(/^\u4f60\u542c\u6211\u8bf4[\u554a\u5440]?[\uff0c,]?/, '\u4e43\u542c\u54b1\u55e6\u55b5\uff0c');
                    c = c.replace(/^\u4f60\u77e5\u9053\u5417[\uff1f?]/, '\u4e43\u77e5\u9053\u55b5\uff1f');
                    c = c.replace(/^\u4f60\u6653\u5f97[\u5417\u4e48]?[\uff1f?]/, '\u4e43\u6653\u5f97\u55b5\uff1f');
                    c = c.replace(/^\u4f60\u77e5\u9053\u4e0d[\uff1f?]/, '\u4e43\u77e5\u9053\u4e0d\u55b5\uff1f');



                    c = c.replace(/^\u597d\u7684\u597d\u7684/, '\u597d\u54d2\u597d\u54d2');
                    c = c.replace(/^\u597d\u7684\u5427/, '\u597d\u54d2\u53ed');
                    c = c.replace(/^\u884c\u5427/, '\u884c\u53ed');
                    c = c.replace(/^\u5bf9\u54e6/, '\u5bf9\u54e6\u55b5');
                    c = c.replace(/^\u4e5f\u5bf9/, '\u4e5f\u5bf9\u55b5');
                    c = c.replace(/^\u4e5f\u662f/, '\u4e5f\u7d20\u55b5');
                    c = c.replace(/^\u539f\u6765\u5982\u6b64[\uff01!]?/, '\u539f\u6765\u5982\u6b64\u55b5\uff01');
                    c = c.replace(/^\u5f53\u7136[\u5566\u4e86]?[\uff01!]?/, '\u5f53\u7136\u55b5\uff01');
                    c = c.replace(/^\u5fc5\u987b[\u7684]?[\uff01!]?/, '\u5fc5\u987b\u55b5\uff01');
                    c = c.replace(/^\u80af\u5b9a[\u7684]?[\uff01!]?/, '\u80af\u5b9a\u55b5\uff01');
                    c = c.replace(/^\u59a5\u59a5\u7684[\uff01!]?/, '\u59a5\u59a5\u55b5\uff01');
                    c = c.replace(/^\u5b89\u6392\u7684[\uff01!]?/, '\u5b89\u6392\u55b5\uff01');
                    c = c.replace(/^\u5b89\u6392\u4e86[\uff01!]?/, '\u5b89\u6392\u5566\uff01');



                    c = c.replace(/^\u8ba9\u6211\u60f3\u60f3[\u554a\u5440\u54e6]?/, '\u8ba9\u54b1\u60f3\u60f3\u55b5');
                    c = c.replace(/^\u6211\u60f3\u60f3/, '\u54b1\u60f3\u60f3\u55b5');
                    c = c.replace(/^\u600e\u4e48\u8bf4\u5462[\uff1f!\uff1f]/, '\u80bf\u4e48\u8bf4\u634f');
                    c = c.replace(/^\u8fd9\u4e2a\u561b/, '\u4ecb\u4e2a\u561b');
                    c = c.replace(/^\u90a3\u4e2a\u561b/, '\u8fa3\u4e2a\u561b');
                    c = c.replace(/^\u600e\u4e48\u8bf4[/]?/, '\u80bf\u4e48\u55e6');
                    c = c.replace(/^emmm/, 'emmm\u55b5');
                    c = c.replace(/^emm/, 'emm\u55b5');
                    c = c.replace(/^\u55ef…/, '\u55ef…\u55b5');
                    c = c.replace(/^\u5443…/, '\u5443…\u55b5');
                    c = c.replace(/^\u90a3\u4e2a\u90a3\u4e2a/, '\u8fa3\u4e2a\u8fa3\u4e2a');
                    c = c.replace(/^\u8fd9\u4e2a\u8fd9\u4e2a/, '\u4ecb\u4e2a\u4ecb\u4e2a');



                    c = c.replace(/\u771f\u662f\u7684/g, '\u771f\u7d20\u6ef4');
                    c = c.replace(/\u771f\u7684\u662f/g, '\u771f\u7d20\u54d2');
                    c = c.replace(/\u8fd9\u90fd\u4e0d/g, '\u4ecb\u90fd\u4e0d');
                    c = c.replace(/\u8fd9\u90fd\u884c/g, '\u4ecb\u90fd\u884c\u55b5');
                    c = c.replace(/\u8fd9\u90fd\u80fd/g, '\u4ecb\u90fd\u80fd\u55b5');
                    c = c.replace(/\u8fd9\u4e5f\u592a/g, '\u4ecb\u4e5f\u592a');
                    c = c.replace(/\u8fd9\u4e5f\u7b97/g, '\u4ecb\u4e5f\u7b97\u55b5');
                    c = c.replace(/\u8fd9\u4e5f\u53eb/g, '\u4ecb\u4e5f\u53eb\u55b5');
                    c = c.replace(/\u4ec0\u4e48\u9b3c/g, '\u795e\u9a6c\u9b3c');
                    c = c.replace(/\u4ec0\u4e48\u73a9\u610f\u513f/g, '\u795e\u9a6c\u73a9\u610f\u513f');
                    c = c.replace(/\u4ec0\u4e48\u4e1c\u4e1c/g, '\u795e\u9a6c\u4e1c\u4e1c');
                    c = c.replace(/\u4e3a\u4ec0\u4e48\u554a/g, '\u4e3a\u795e\u9a6c\u5440');
                    c = c.replace(/\u4e3a\u4ec0\u4e48\u5440/g, '\u4e3a\u795e\u9a6c\u9e2d');
                    c = c.replace(/\u51ed\u4ec0\u4e48/g, '\u51ed\u795e\u9a6c');



                    c = c.replace(/\u54c8\u54c8\u54c8\u54c8/g, '\u54c8\u54c8\u54c8\u55b5');
                    c = c.replace(/\u54c8\u54c8\u54c8/g, '\u54c8\u54c8\u55b5');
                    c = c.replace(/\u563f\u563f\u563f/g, '\u563f\u563f\u55b5');
                    c = c.replace(/\u5475\u5475\u5475/g, '\u5475\u5475\u55b5');
                    c = c.replace(/\u563b\u563b\u563b/g, '\u563b\u563b\u55b5');
                    c = c.replace(/\u5657\u54c8\u54c8\u54c8/g, '\u5657\u54c8\u54c8\u55b5');
                    c = c.replace(/\u7b11\u6b7b(\u4e86|\u5566)/g, '\u7b11\u6b7b\u55b5');
                    c = c.replace(/\u7b11\u5230\u4e0d\u884c/g, '\u7b11\u5230\u4e0d\u884c\u55b5');
                    c = c.replace(/\u7b11\u51fa\u773c\u6cea/g, '\u7b11\u51fa\u773c\u6cea\u55b5');
                    c = c.replace(/\u7b11\u54ed\u4e86/g, '\u7b11\u54ed\u55b5');
                    c = c.replace(/\u7b11\u6b7b\u6211/g, '\u7b11\u6b7b\u54b1\u55b5');



                    c = c.replace(/^2333/, '2333\u55b5');
                    c = c.replace(/^233/, '233\u55b5');
                    c = c.replace(/^666/, '666\u55b5');
                    c = c.replace(/^999/, '999\u55b5');
                    c = c.replace(/6\u7ffb\u4e86/, '6\u7ffb\u5566\u55b5');
                    c = c.replace(/\u592a6\u4e86/, '\u7092\u9e216\u54d2\u8bf4');



                    c = c.replace(/^\u771f\u7684\u5047\u7684/, '\u771f\u55b5\u5047\u55b5\uff1f');
                    c = c.replace(/^\u771f\u5047/, '\u771f\u55b5\u5047\u55b5\uff1f');
                    c = c.replace(/^\u8ba4\u771f\u7684\u5417/, '\u8ba4\u771f\u55b5\uff1f');
                    c = c.replace(/^\u4f60\u8ba4\u771f\u7684/, '\u4e43\u8ba4\u771f\u55b5\uff1f');
                    c = c.replace(/^\u5f00\u73a9\u7b11\u7684\u5427/, '\u5f00\u73a9\u7b11\u55b5\uff1f');
                    c = c.replace(/^\u4f60\u786e\u5b9a/, '\u4e43\u786e\u5b9a\u55b5\uff1f');
                    c = c.replace(/^\u4f60\u8ba4\u771f\u7684\u5417/, '\u4e43\u8ba4\u771f\u55b5\uff1f');
                    c = c.replace(/^\u771f\u7684\u4e48/, '\u771f\u55b5\uff1f');
                    c = c.replace(/^\u771f\u7684\u561b/, '\u771f\u55b5\uff1f');



                    c = c.replace(/^\u54e6\u54e6/, '\u54e6\u54e6\u55b5');
                    c = c.replace(/^\u55ef\u55ef/, '\u55ef\u55ef\u5450');
                    c = c.replace(/^\u597d\u7684\u5427/, '\u597d\u54d2\u53ed');
                    c = c.replace(/^\u884c\u5427\u884c\u5427/, '\u884c\u53ed\u884c\u53ed');
                    c = c.replace(/^\u597d\u5427\u597d\u5427/, '\u597d\u53ed\u597d\u53ed');
                    c = c.replace(/^\u7b97\u4e86\u7b97\u4e86/, '\u7b97\u5566\u7b97\u5566');
                    c = c.replace(/^\u54e6\u77e5\u9053\u4e86/, '\u54e6\u77e5\u9053\u55b5');
                    c = c.replace(/^\u77e5\u9053\u4e86\u77e5\u9053\u4e86/, '\u77e5\u9053\u5566\u77e5\u9053\u5566');
                    c = c.replace(/^\u884c\u77e5\u9053\u4e86/, '\u884c\u77e5\u9053\u55b5');
                    c = c.replace(/^\u55ef\u77e5\u9053\u4e86/, '\u55ef\u77e5\u9053\u55b5');
                    c = c.replace(/^\u54e6\u4e86/, '\u54e6\u55b5');
                    c = c.replace(/^\u61c2\u4e86/, '\u61c2\u55b5');
                    c = c.replace(/^\u660e\u767d\u4e86/, '\u660e\u767d\u55b5');
                    c = c.replace(/^\u6536\u5230/, '\u6536\u5230\u55b5');
                    c = c.replace(/^OKKK/, 'OK\u55b5');
                    c = c.replace(/^\u597d\u561e/, '\u597d\u561e\u55b5');
                    c = c.replace(/^\u5f97\u561e/, '\u5f97\u561e\u55b5');
                    c = c.replace(/^\u6ca1\u95ee\u9898/, '\u6ca1\u95ee\u9898\u54df');



                    c = c.replace(/^\u8bf4\u5230\u8fd9\u4e2a/, '\u8bf4\u5230\u4ecb\u4e2a\u55b5');
                    c = c.replace(/^\u63d0\u8d77\u8fd9\u4e2a/, '\u63d0\u8d77\u4ecb\u4e2a\u55b5');
                    c = c.replace(/^\u5173\u4e8e\u8fd9\u4e2a/, '\u5173\u4e8e\u4ecb\u4e2a\u55b5');
                    c = c.replace(/^\u9664\u6b64\u4e4b\u5916/, '\u9664\u55b5\u4e4b\u5916');
                    c = c.replace(/^\u53e6\u5916[\uff0c,]/, '\u53e6\u5916\u55b5\uff0c');
                    c = c.replace(/^\u8fd8\u6709[\u554a\u5440\u54e6]?[\uff0c,]/, '\u8fd8\u6709\u55b5\uff0c');



                    for (var _pk in _protectMap) {
                        if (_protectMap.hasOwnProperty(_pk)) {
                            c = c.split(_pk).join(_protectMap[_pk]);
                        }
                    }

                    if (c !== o) parts[i] = c;
                }
            }
            return parts.join('');
        }

        function appendPhrase(clause, ph) {
            if (shouldSkipAppend(clause)) return clause;
            if (/[\u5566\u561b\u53ed\u634f\u9e2d\u6ef4\u54d2\u54df\u55f7\u5440\u545c]([\u3002\uff01\uff1f.!?\uff01\uff1f~…]*)$/.test(clause)) return clause;
            if (/[\u3002\uff01\uff1f.!?\uff01\uff1f~…]$/.test(clause)) {
                var last = clause[clause.length - 1];
                return clause.substring(0, clause.length - 1) + ph + last;
            }
            return clause + ph;
        }

        function runPetPhrases(text, phraseList) {
            if (!phraseList || !phraseList.length) return text;
            var ph = pickRandom(phraseList);

            var parts = text.split(/([\uff0c,\u3001\uff1b;……\u2026\u2025\s]+)/);
            if (parts.length > 1) {
                var lastIdx = parts.length - 1;
                if (lastIdx % 2 === 0 && parts[lastIdx]) {
                    parts[lastIdx] = appendPhrase(parts[lastIdx], ph);
                }
                return parts.join('');
            }
            return appendPhrase(text, ph);
        }

        var rawPetPhrase = DEFAULT_PHRASE_POOL;
        var emojiOn  = true;
        var phraseOn = true;
        var petSuffixOn = true;
        var SK = "iirose_kawaii_moe";

        function parsePhraseList(raw) {
            if (!raw || !raw.trim()) return [];
            return raw.split(/[,\uff0c]/).map(function(s){ return s.trim(); }).filter(function(s){ return s.length > 0; });
        }

        function getActivePhrasePool() {
            return parsePhraseList(rawPetPhrase);
        }

        function loadS(){
            try{
                var r=localStorage.getItem(SK);
                var s=r?JSON.parse(r):{};
                rawPetPhrase = s.pp && s.pp.trim() ? s.pp : rawPetPhrase;
                emojiOn  = s.eo!==false;
                phraseOn = s.po!==false;
                petSuffixOn = s.ps!==false;
            }catch(e){}
        }
        function saveS(){
            localStorage.setItem(SK, JSON.stringify({pp:rawPetPhrase, eo:emojiOn, po:phraseOn, ps:petSuffixOn}));
        }

        function shouldSkipText(text) {
            if (!text) return true;
            if (/ {3,}/.test(text)) return true;
            if (/https?:\/\//.test(text)) return true;
            if (/\u7f51\u6613\u4e91\u97f3\u4e50|QQ\u97f3\u4e50|\u9177\u72d7\u97f3\u4e50|\u9177\u6211\u97f3\u4e50|Spotify|Apple Music|YouTube Music|\u54aa\u5495\u97f3\u4e50|\u5343\u5343\u97f3\u4e50/.test(text)) return true;
            if (/\u5c0f\u827e|\u7ea2\u5305/.test(text)) return true;
            if (text.length > 300 && !/[\u3002\uff01\uff1f\uff0c\u3001\uff1b\uff1a]/.test(text)) return true;
            return false;
        }

        function processText(text) {
            if (shouldSkipText(text)) return text;
            var t = text;
            if (phraseOn) {
                t = replaceParticles(t);
            }
            if (petSuffixOn) {
                var pool = getActivePhrasePool();
                if (pool.length > 0) t = runPetPhrases(t, pool);
            }
            if (emojiOn) {
                t = addRandomKaomoji(t);
            }
            return t;
        }

        var _domJustTouched = false;

        function touchInput() {
            try {
                var inp = document.getElementById('moveinput');
                if (inp && inp.value.trim()) {
                    var before = inp.value;
                    var after  = processText(before);
                    if (after !== before) {
                        inp.value = after;
                        inp.dispatchEvent(new Event('input', {bubbles:true}));
                        _domJustTouched = true;
                        setTimeout(function(){ _domJustTouched = false; }, 500);
                    }
                }
            } catch(e){}
        }

        var _origSend = null, _hooked = false;

        function doHook() {
            if (_hooked) return;
            if (!window.socket || typeof window.socket.send !== 'function') {
                setTimeout(doHook, 200);
                return;
            }
            _origSend = window.socket.send.bind(window.socket);

            window.socket.send = function(data) {
                try {
                    if (_domJustTouched) {
                        _domJustTouched = false;
                        return _origSend(data);
                    }
                    var str = typeof data === 'string' ? data : '';
                    if (str && str.charCodeAt(0) === 123) {
                        var obj = JSON.parse(str);
                        if (obj.m && typeof obj.m === 'string') {
                            var before = obj.m;
                            var after = processText(before);
                            if (after !== before) {
                                obj.m = after;
                                data = JSON.stringify(obj);
                            }
                        }
                    }
                } catch(e) {}
                return _origSend(data);
            };

            _hooked = true;
        }

        function hookSendBtn() {
            try {
                var btn = document.getElementsByClassName('moveinputSendBtn')[0];
                if (btn && !btn.__kawaii_hooked) {
                    btn.__kawaii_hooked = true;
                    btn.addEventListener('mousedown', function(e) {
                        touchInput();
                    }, true);
                }
            } catch(e){}
        }

        function hookEnter() {
            try {
                var inp = document.getElementById('moveinput');
                if (inp && !inp.__kawaii_enter) {
                    inp.__kawaii_enter = true;
                    inp.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                            touchInput();
                        }
                    }, true);
                }
            } catch(e){}
        }

        function buildUI(){
            if(document.getElementById("kawaii-css-moe"))return;
            var s=document.createElement("style");s.id="kawaii-css-moe";
            s.textContent=[
                ":root{--kw-cap-w:clamp(60px,9vw,80px);--kw-cap-h:clamp(28px,4vh,34px);--kw-cap-v:18px}",
                "#kawaii-cap{position:fixed;right:0;bottom:25vh;z-index:9999999;width:var(--kw-cap-w);height:var(--kw-cap-h);background:rgba(255,136,170,0.15);border-radius:100px 0 0 100px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;color:#e91e63;user-select:none;transform:translateX(calc(var(--kw-cap-w) - var(--kw-cap-v)));transition:transform .4s cubic-bezier(.2,0,.2,1),background .4s;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}",
                "#kawaii-cap::after{content:'';position:absolute;top:-6px;left:-6px;right:-6px;bottom:-6px;background:transparent;}",
                "#kawaii-cap:hover{transform:translateX(0);background:rgba(255,136,170,0.5);}",
                "#kawaii-cap .ct{font-size:clamp(10px,1.4vw,12px);font-weight:500;letter-spacing:.5px;white-space:nowrap;opacity:.3;transition:opacity .4s;width:100%;text-align:center;padding-left:8px;}",
                "#kawaii-cap:hover .ct{opacity:.9;padding-left:0;}",
                "#kawaii-pnl{position:fixed;right:0;bottom:25vh;z-index:9999999;width:230px;background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:2px solid #f8a;border-right:none;border-radius:14px 0 0 14px;padding:14px;box-shadow:0 8px 32px rgba(255,136,170,.22);font:13px/1.6 'Microsoft YaHei',sans-serif;color:#444;display:none;}",
                "#kawaii-pnl.on{display:block;}",
                "#kawaii-pnl .hdr{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#fce4ec,#f8bbd0);margin:-14px -14px 10px;padding:10px 14px;border-radius:12px 0 0 0;}",
                "#kawaii-pnl .hdr h4{margin:0;font-size:14px;color:#e91e63;letter-spacing:.5px;}",
                "#kawaii-pnl .hdr .cls{cursor:pointer;font-size:16px;color:#e91e63;opacity:.6;line-height:1;}",
                "#kawaii-pnl .hdr .cls:hover{opacity:1;}",
                "#kawaii-pnl .grp{background:#fef6f9;border-radius:8px;padding:6px 10px;margin-bottom:6px;}",
                "#kawaii-pnl .grp .gl{font-size:11px;color:#888;display:block;margin-bottom:2px;}",
                "#kawaii-pnl .r{display:flex;align-items:center;justify-content:space-between;margin:3px 0;}",
                "#kawaii-pnl .r span{font-size:12px;color:#555;}",
                "#kawaii-pnl .r input[type=text]{flex:1;margin-left:8px;border:1px solid #f0d0da;border-radius:6px;padding:4px 8px;font-size:12px;outline:none;background:#fff;transition:border-color .2s;}",
                "#kawaii-pnl .r input[type=text]:focus{border-color:#f8a;}",
                "#kawaii-pnl .tgl{position:relative;width:40px;height:22px;cursor:pointer;flex-shrink:0;}",
                "#kawaii-pnl .tgl input{display:none;}",
                "#kawaii-pnl .tgl .sl{position:absolute;top:0;left:0;right:0;bottom:0;background:#d5d5d5;border-radius:22px;transition:.3s;box-shadow:inset 0 1px 3px rgba(0,0,0,.1);}",
                "#kawaii-pnl .tgl .sl::before{content:'';position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;box-shadow:0 1px 3px rgba(0,0,0,.15);}",
                "#kawaii-pnl .tgl input:checked+.sl{background:linear-gradient(135deg,#f6a,#e91e63);}",
                "#kawaii-pnl .tgl input:checked+.sl::before{transform:translateX(18px);}",
                "#kawaii-pnl .st{font-size:10px;color:#bbb;text-align:center;margin-top:4px;padding-top:4px;border-top:1px solid #f5e0e6;}"
            ].join('\n');
            document.head.appendChild(s);

            var phEsc = rawPetPhrase.replace(/"/g,"&quot;").replace(/</g,"&lt;");

            var cap=document.createElement("div");cap.id="kawaii-cap";
            cap.innerHTML='<span class="ct">\ud83c\udf38</span>';
            document.body.appendChild(cap);

            var pl=document.createElement("div");pl.id="kawaii-pnl";
            pl.innerHTML=[
                '<div class=hdr>',
                '<h4>\ud83c\udf38 \u53ef\u7231\u6587\u5b57 Moe</h4>',
                '<span class=cls id=kawaii-close title="\u6536\u8d77">\u2715</span>',
                '</div>',
                '<div class=grp>',
                '<div class=r><span>\u989c\u6587\u5b57</span>',
                '<label class=tgl><input type=checkbox id=kawaii-eo'+(emojiOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '<div class=r><span>\u53e3\u7656</span>',
                '<label class=tgl><input type=checkbox id=kawaii-po'+(phraseOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '<div class=r><span>\u53e3\u7656\u540e\u7f00</span>',
                '<label class=tgl><input type=checkbox id=kawaii-ps'+(petSuffixOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '</div>',
                '<div class=grp>',
                '<span class=gl>\u53e3\u7656\u5185\u5bb9\uff08\u9017\u53f7\u5206\u9694\uff09</span>',
                '<div class=r>',
                '<input type=text id=kawaii-ph value="'+phEsc+'" placeholder="\u55b5~,\u7684\u8bf4~,\u5450~">',
                '</div>',
                '</div>',
                '<div class=st id=kawaii-v16st>ws:'+(_hooked?'\u2713':'\u2717')+' btn:'+(document.getElementsByClassName('moveinputSendBtn')[0]?'\u2713':'\u2717')+'</div>'
            ].join('');
            document.body.appendChild(pl);

            cap.onclick=function(e){e.stopPropagation();cap.style.display="none";pl.style.display="block";pl.classList.add("on");};
            document.getElementById("kawaii-close").onclick=function(e){e.stopPropagation();pl.style.display="none";cap.style.display="flex";};
            document.addEventListener("click",function(e){if(pl.classList.contains("on")&&!pl.contains(e.target)){pl.style.display="none";cap.style.display="flex";}});
            document.addEventListener("touchend",function(e){if(pl.classList.contains("on")&&!pl.contains(e.target)){pl.style.display="none";cap.style.display="flex";}},{passive:true});

            document.getElementById("kawaii-eo").addEventListener("change",function(){emojiOn=this.checked;saveS();});
            document.getElementById("kawaii-po").addEventListener("change",function(){phraseOn=this.checked;saveS();});
            document.getElementById("kawaii-ps").addEventListener("change",function(){petSuffixOn=this.checked;saveS();});
            document.getElementById("kawaii-ph").addEventListener("input",function(){rawPetPhrase=this.value||"";saveS();});
        }

        console.log("[kawaii-moe] init");
        loadS();
        var pool = getActivePhrasePool();

        doHook();
        setTimeout(doHook, 500);
        var _hid = setInterval(function(){ if(_hooked) clearInterval(_hid); else doHook(); }, 1000);

        setTimeout(function(){ hookSendBtn(); hookEnter(); }, 1000);
        setTimeout(function(){ hookSendBtn(); hookEnter(); }, 3000);

        setTimeout(buildUI, 500);

        window.iiroseKawaiiMoe={
            setEmojiOn:function(b){emojiOn=b;saveS();},
            setPhraseOn:function(b){phraseOn=b;saveS();},
            setPetSuffixOn:function(b){petSuffixOn=b;saveS();},
            setPetPhrase:function(p){rawPetPhrase=p;saveS();},
            getStatus:function(){return{emojiOn:emojiOn,phraseOn:phraseOn,petSuffixOn:petSuffixOn,pool:getActivePhrasePool(),hooked:_hooked};},
            processText:processText
        };

        console.log("[kawaii-moe] ready");
    }

    var innerCode = '(' + getInnerCode.toString() + ')();';

    function isInside() { return location.pathname === '/messages.html'; }
    function tryInject() {
        if (isInside()) {
            if (window['__kawaiiMoe']) return true;
            window['__kawaiiMoe'] = true;
            try { eval(innerCode); } catch(e) { console.error('[kawaii-moe] fail:', e.message); }
            return true;
        }
        try {
            var mf = document.getElementById('mainFrame');
            var iw = mf&&mf.contentWindow, id = mf&&mf.contentDocument;
            if (!iw||!id||iw['__kawaiiMoe']) return false;
            var ok=false;
            try{var s=id.createElement('script');s.textContent=innerCode;id.head.appendChild(s);ok=true;}catch(e){}
            if(!ok)try{new iw.Function(innerCode)();ok=true;}catch(e){}
            if(!ok)try{iw.eval(innerCode);ok=true;}catch(e){}
            if(ok){iw['__kawaiiMoe']=true;}
            return ok;
        }catch(e){return false;}
    }

    tryInject();
    var tid=setInterval(function(){if(tryInject())clearInterval(tid);},500);
    try{var mf=document.getElementById('mainFrame');if(mf)mf.addEventListener('load',function(){if(tid)clearInterval(tid);tid=setInterval(function(){if(tryInject())clearInterval(tid);},500);});}catch(e){}
})();
