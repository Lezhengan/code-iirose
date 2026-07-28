(function () {
    'use strict';

    function getInnerCode() {


        var KEIGO_ENDING_POOL = [
            "\u3002","\u3002",
            "\u3002","\u3002"
        ];

        var POLITE_PROB = 0.25;



        var MOOD_ENDINGS = {
            gratitude: [
                "\uff0c\u611f\u6fc0\u4e0d\u5c3d\u3002","\uff0c\u4e0d\u80dc\u611f\u6fc0\u3002","\uff0c\u94ed\u611f\u4e94\u5185\u3002",
                "\uff0c\u8c28\u81f4\u8c22\u5ff1\u3002","\uff0c\u6df1\u8868\u8c22\u610f\u3002","\uff0c\u611f\u6069\u6234\u5fb7\u3002"
            ],
            apology: [
                "\uff0c\u6df1\u611f\u6b49\u610f\u3002","\uff0c\u656c\u8bf7\u89c1\u8c05\u3002","\uff0c\u4f0f\u60df\u6d77\u6db5\u3002",
                "\uff0c\u4e0d\u80dc\u60f6\u6050\u3002","\uff0c\u671b\u4e5e\u6055\u7f6a\u3002","\uff0c\u60f6\u6050\u4e4b\u81f3\u3002"
            ],
            request: [
                "\uff0c\u6073\u8bf7\u4fef\u5141\u3002","\uff0c\u671b\u8bf7\u6279\u51c6\u3002","\uff0c\u4f0f\u8bf7\u88c1\u593a\u3002",
                "\uff0c\u656c\u7948\u793a\u4e0b\u3002","\uff0c\u5207\u76fc\u7389\u6210\u3002","\uff0c\u62dc\u6258\u4e86\u3002"
            ],
            agree: [
                "\uff0c\u8c28\u9075\u53f0\u547d\u3002","\uff0c\u656c\u4ece\u5c0a\u610f\u3002","\uff0c\u8bda\u7136\u5982\u662f\u3002",
                "\uff0c\u6240\u8a00\u6781\u662f\u3002","\uff0c\u8c28\u9886\u6559\u8bf2\u3002","\uff0c\u6b63\u8be5\u5982\u6b64\u3002"
            ],
            disagree: [
                "\uff0c\u7a83\u4ee5\u4e3a\u4e0d\u7136\u3002","\uff0c\u6055\u96be\u4ece\u547d\u3002","\uff0c\u6050\u6709\u4e0d\u59a5\u3002",
                "\uff0c\u672a\u6562\u82df\u540c\u3002","\uff0c\u6b64\u4e8b\u5c1a\u9700\u5546\u69b7\u3002","\uff0c\u5c82\u6562\u5982\u6b64\u3002"
            ],
            greeting: [
                "\uff0c\u4e45\u4ef0\u4e45\u4ef0\u3002","\uff0c\u5e78\u4f1a\u5e78\u4f1a\u3002","\uff0c\u522b\u6765\u65e0\u6059\u3002",
                "\uff0c\u591a\u65e5\u4e0d\u89c1\uff0c\u751a\u662f\u6302\u5ff5\u3002","\uff0c\u606d\u5019\u591a\u65f6\u3002","\uff0c\u6709\u5931\u8fdc\u8fce\u3002"
            ],
            farewell: [
                "\uff0c\u540e\u4f1a\u6709\u671f\u3002","\uff0c\u5c31\u6b64\u544a\u8f9e\u3002","\uff0c\u6055\u4e0d\u8fdc\u9001\u3002",
                "\uff0c\u6539\u65e5\u518d\u4f1a\u3002","\uff0c\u73cd\u91cd\u73cd\u91cd\u3002","\uff0c\u544a\u8f9e\u4e86\u3002"
            ],
            understand: [
                "\uff0c\u660e\u767d\u4e86\u3002","\uff0c\u4e86\u7136\u4e8e\u80f8\u3002","\uff0c\u8c28\u8bb0\u5728\u5fc3\u3002",
                "\uff0c\u5df2\u7136\u660e\u4e86\u3002","\uff0c\u8305\u585e\u987f\u5f00\u3002","\uff0c\u627f\u8499\u6307\u70b9\u3002"
            ],
            confirm: [
                "\uff0c\u786e\u5b9e\u5982\u6b64\u3002","\uff0c\u8bda\u5982\u6240\u8a00\u3002","\uff0c\u786e\u51ff\u65e0\u7591\u3002",
                "\uff0c\u539f\u6765\u5982\u6b64\u3002","\uff0c\u5f53\u771f\u5982\u6b64\u3002","\uff0c\u539f\u6765\u8fd9\u822c\u3002"
            ]
        };

        function detectMood(s) {
            if (/\u8c22\u8c22|\u611f\u8c22|\u591a\u8c22|\u611f\u6069|\u8c22\u4e86|\u8f9b\u82e6|\u9ebb\u70e6|\u6709\u52b3|\u8d39\u5fc3|\u52b3\u9a7e|\u62dc\u6258|\u9053\u8c22|\u611f\u6fc0|\u5927\u6069/.test(s)) return 'gratitude';
            if (/\u62b1\u6b49|\u5bf9\u4e0d\u8d77|\u4e0d\u597d\u610f\u601d|\u9053\u6b49|\u8d54\u7f6a|\u81f4\u6b49|\u6b49\u610f|\u5931\u793c|\u5192\u72af|\u5f97\u7f6a|\u6253\u6405|\u6253\u6270|\u6dfb\u9ebb\u70e6|\u89c1\u8c05/.test(s)) return 'apology';
            if (/\u8bf7\u95ee|\u8bf7|\u53ef\u5426|\u80fd\u5426|\u662f\u5426|\u80fd\u4e0d\u80fd|\u53ef\u4e0d\u53ef\u4ee5|\u5e2e|\u5e2e\u5fd9|\u534f\u52a9|\u9ebb\u70e6|\u62dc\u6258|\u52b3\u9a7e|\u6c42|\u6073\u8bf7|\u6073\u6c42|\u8bf7\u6c42/.test(s)) return 'request';
            if (/\u597d\u7684|\u597d\u5427|\u884c|\u53ef\u4ee5|\u6ca1\u95ee\u9898|ok|OK|\u662f\u7684|\u5bf9\u7684|\u6ca1\u9519|\u6b63\u786e|\u786e\u5b9e|\u8d5e\u540c|\u540c\u610f|\u8d5e\u6210|\u652f\u6301|\u9644\u8bae/.test(s)) return 'agree';
            if (/\u4e0d\u884c|\u4e0d\u597d|\u4e0d\u53ef\u4ee5|\u4e0d\u8981|\u4e0d\u540c\u610f|\u53cd\u5bf9|\u62d2\u7edd|\u5426|\u4e0d\u5bf9|\u9519\u8bef|\u4e0d\u6b63\u786e|\u6709\u8bef|\u5dee\u77e3|\u6b20\u59a5|\u4e0d\u59a5|\u4e0d\u5f53|\u4e0d\u5b9c/.test(s)) return 'disagree';
            if (/\u4f60\u597d|\u60a8\u597d|\u65e9\u5b89|\u665a\u5b89|\u5927\u5bb6\u597d|\u5404\u4f4d\u597d|\u597d\u4e45\u4e0d\u89c1|\u5e78\u4f1a|\u4e45\u4ef0|\u4e45\u8fdd/.test(s)) return 'greeting';
            if (/\u518d\u89c1|\u62dc\u62dc|\u518d\u4f1a|\u544a\u8f9e|\u56de\u89c1|\u56de\u5934\u89c1|\u660e\u5929\u89c1|\u4e0b\u6b21\u89c1|\u540e\u4f1a\u6709\u671f|\u5931\u966a/.test(s)) return 'farewell';
            if (/\u660e\u767d|\u7406\u89e3|\u61c2\u4e86|\u4e86\u89e3|\u6536\u5230|\u6653\u5f97\u4e86|\u77e5\u9053\u4e86|\u6e05\u695a\u4e86|\u660e\u767d\u4e86|\u9886\u609f/.test(s)) return 'understand';
            if (/\u771f\u7684\u5417|\u771f\u7684\u4e48|\u5f53\u771f|\u786e\u5b9a|\u786e\u8ba4|\u786e\u5b9e|\u5c5e\u5b9e|\u6838\u5b9e|\u9a8c\u8bc1/.test(s)) return 'confirm';
            return '';
        }

        function addPoliteEnding(text) {
            if (text.length < 3) return text;
            var sentences = text.split(/([\u3002\uff01\uff1f.!?\n]+)/);
            var changed = false;
            for (var si = 0; si < sentences.length; si++) {
                if (si % 2 === 0 && sentences[si] && sentences[si].length >= 3) {
                    if (Math.random() >= POLITE_PROB) continue;
                    var mood = detectMood(sentences[si]);
                    var pool = mood && MOOD_ENDINGS[mood] ? MOOD_ENDINGS[mood] : null;
                    if (pool) {
                        var k = pool[Math.floor(Math.random() * pool.length)];
                        var trimmed = sentences[si].replace(/[\u3002\uff01\uff1f.!?]+$/, '');
                        sentences[si] = trimmed + k;
                        changed = true;
                    }
                }
            }
            if (changed) return sentences.join('');
            return text;
        }







        function replaceText(text) {
            var parts = text.split(/([\uff0c,\u3001\uff1b;……\u2026\u2025\s\u3002\uff01\uff1f.!?]+)/);
            for (var i = 0; i < parts.length; i++) {
                if (i % 2 === 0 && parts[i]) {
                    var c = parts[i];
                    var o = c;



                    var _pm = {};
                    var _pi = 0;
                    c = c.replace(/([\u4e00-\u9fff])\1([\u4e00-\u9fff])\2/g, function(m) {
                        var k = '\x00P' + (_pi++) + '\x00';
                        _pm[k] = m; return k;
                    });


                    var t2s = {
                        '\u55ce':'\u5417','\u9ebd':'\u4e48','\u9ebc':'\u4e48','\u6c92':'\u6ca1','\u70ba':'\u4e3a','\u6703':'\u4f1a','\u8aaa':'\u8bf4','\u8a71':'\u8bdd','\u8b1d':'\u8c22',
                        '\u5c0d':'\u5bf9','\u932f':'\u9519','\u9ede':'\u70b9','\u9593':'\u95f4','\u554f':'\u95ee','\u95dc':'\u5173','\u958b':'\u5f00','\u9580':'\u95e8','\u4f86':'\u6765',
                        '\u898b':'\u89c1','\u8a8d':'\u8ba4','\u8b58':'\u8bc6','\u8b93':'\u8ba9','\u8acb':'\u8bf7','\u5e6b':'\u5e2e','\u5e79':'\u5e72','\u7f75':'\u9a82','\u9ad2':'\u810f',
                        '\u8a72':'\u8be5','\u88e1':'\u91cc','\u5f8c':'\u540e','\u65bc':'\u4e8e','\u6642':'\u65f6','\u904e':'\u8fc7','\u9032':'\u8fdb','\u9019':'\u8fd9','\u500b':'\u4e2a',
                        '\u5011':'\u4eec','\u8207':'\u4e0e','\u5f9e':'\u4ece','\u52d5':'\u52a8','\u5b78':'\u5b66','\u7fd2':'\u4e60','\u807d':'\u542c','\u8b80':'\u8bfb','\u5beb':'\u5199',
                        '\u66f8':'\u4e66','\u756b':'\u753b','\u767c':'\u53d1','\u73fe':'\u73b0','\u9084':'\u8fd8','\u7d66':'\u7ed9','\u7576':'\u5f53','\u61c9':'\u5e94','\u7e3d':'\u603b',
                        '\u5e7e':'\u51e0','\u537b':'\u5374','\u5c07':'\u5c06','\u96d9':'\u53cc','\u842c':'\u4e07','\u6b72':'\u5c81','\u8ab0':'\u8c01','\u5169':'\u4e24','\u967d':'\u9633',
                        '\u9670':'\u9634','\u96fb':'\u7535','\u8eca':'\u8f66','\u9577':'\u957f','\u98a8':'\u98ce','\u96f2':'\u4e91','\u96e3':'\u96be','\u8f15':'\u8f7b','\u8f03':'\u8f83',
                        '\u8f49':'\u8f6c','\u9023':'\u8fde','\u9060':'\u8fdc','\u904b':'\u8fd0','\u9ad4':'\u4f53','\u81fa':'\u53f0','\u7063':'\u6e7e','\u570b':'\u56fd','\u5340':'\u533a',
                        '\u9ee8':'\u515a','\u611b':'\u7231','\u6a23':'\u6837','\u96bb':'\u53ea','\u689d':'\u6761','\u982d':'\u5934','\u908a':'\u8fb9','\u9eb5':'\u9762','\u6a5f':'\u673a',
                        '\u6c23':'\u6c14','\u71c8':'\u706f','\u9b5a':'\u9c7c','\u9ce5':'\u9e1f','\u99ac':'\u9a6c','\u8c93':'\u732b','\u8c6c':'\u732a'
                    };
                    c = c.replace(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g, function(m) {
                        return t2s[m] || m;
                    });
                    c = c.replace(/([\u4e00-\u9fff]{2})\1/g, function(m) {
                        var k = '\x00P' + (_pi++) + '\x00';
                        _pm[k] = m; return k;
                    });



                    c = c.replace(/\u7262([\u4e00-\u9fff\u3000-\u303f])/g, '\u5c0a\u656c\u7684$1');



                    c = c.replace(/\u64cd\u4f60\u5988/g, '\u653e\u8086');
                    c = c.replace(/\u64cd\u4f60/g, '\u653e\u8086');
                    c = c.replace(/\u4ed6\u5988/g, '\u5176\u6bcd');
                    c = c.replace(/\u4f60\u5988/g, '\u4ee4\u5802');
                    c = c.replace(/\u5367\u69fd/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u6211\u64cd/g, '\u653e\u8086');
                    c = c.replace(/\u6211\u9760/g, '\u566b');
                    c = c.replace(/\u6211\u64e6/g, '\u566b');
                    c = c.replace(/\u6211\u5e72/g, '\u566b');
                    c = c.replace(/\u5c3c\u739b/g, '\u5c0a\u5802');
                    c = c.replace(/\u9ebb\u75f9/g, '\u8352\u5510');
                    c = c.replace(/\u50bb\u903c/g, '\u611a\u6627');
                    c = c.replace(/\u715e\u7b14/g, '\u611a\u6627');
                    c = c.replace(/\u6c99\u96d5/g, '\u611a\u6627');
                    c = c.replace(/\u8822\u8d27/g, '\u8822\u6750');
                    c = c.replace(/\u5e9f\u7269/g, '\u65e0\u80fd');
                    c = c.replace(/\u5783\u573e/g, '\u7cdf\u7c95');
                    c = c.replace(/\u6df7\u86cb/g, '\u6df7\u8d26');
                    c = c.replace(/\u738b\u516b\u86cb/g, '\u65e0\u803b\u4e4b\u5f92');
                    c = c.replace(/\u72d7\u65e5\u7684/g, '\u9119\u8d31');
                    c = c.replace(/\u6eda\u86cb/g, '\u53bb\u4f11');
                    c = c.replace(/\u6eda\u5f00/g, '\u9000\u4e0b');
                    c = c.replace(/\u6eda/g, '\u9000\u4e0b');
                    c = c.replace(/\u6b7b\u5f00/g, '\u9000\u4e0b');
                    c = c.replace(/\u95ed\u5634/g, '\u7f04\u53e3');
                    c = c.replace(/\u653e\u5c41/g, '\u8352\u8c2c');
                    c = c.replace(/\u653e\u72d7\u5c41/g, '\u8352\u8c2c\u81f3\u6781');
                    c = c.replace(/\u626f\u6de1/g, '\u8352\u8bde');
                    c = c.replace(/\u80e1\u8bf4/g, '\u80e1\u8a00');
                    c = c.replace(/\u80e1\u626f/g, '\u80e1\u8a00');
                    c = c.replace(/\u72d7\u5c41/g, '\u80e1\u8a00\u4e71\u8bed');
                    c = c.replace(/\u795e\u7ecf\u75c5/g, '\u766b\u72c2');
                    c = c.replace(/\u8111\u5b50\u6709\u75c5/g, '\u5931\u5fc3');
                    c = c.replace(/\u6709\u75c5\u5427/g, '\u4e0d\u59a5\u5427');
                    c = c.replace(/\u53d8\u6001/g, '\u4e56\u50fb');
                    c = c.replace(/\u6076\u5fc3/g, '\u4ee4\u4eba\u4f5c\u5455');
                    c = c.replace(/\u5f31\u667a/g, '\u611a\u949d');
                    c = c.replace(/\u767d\u75f4/g, '\u75f4\u611a');
                    c = c.replace(/\u4e0d\u8981\u8138/g, '\u4e0d\u77e5\u5ec9\u803b');
                    c = c.replace(/\u4e0d\u8981\u903c\u8138/g, '\u606c\u4e0d\u77e5\u803b');
                    c = c.replace(/\u8d31\u4eba/g, '\u9119\u8d31\u4e4b\u4eba');
                    c = c.replace(/\u8d31/g, '\u9119\u8d31');
                    c = c.replace(/\u5a4a\u5b50/g, '\u5a3c\u4f18');
                    c = c.replace(/\u755c\u751f/g, '\u79bd\u517d');
                    c = c.replace(/\u64cd/g, '\u653e\u8086');
                    c = c.replace(/\u4f60\u4e2b/g, '\u9601\u4e0b');
                    c = c.replace(/\u8001\u5b50/g, '\u5c0f\u751f');
                    c = c.replace(/\u8001\u5a18/g, '\u5c0f\u751f');
                    c = c.replace(/\u7279\u4e48/g, '\u7740\u5b9e');
                    c = c.replace(/\u725b\u903c/g, '\u5353\u7edd');
                    c = c.replace(/\u88c5\u903c/g, '\u6545\u4f5c\u59ff\u6001');
                    c = c.replace(/\u88c513/g, '\u6545\u4f5c\u59ff\u6001');
                    c = c.replace(/\u50bb\u5566\u5427\u5527/g, '\u611a\u949d');
                    c = c.replace(/\u50bb\u4e4e\u4e4e/g, '\u75f4\u50bb');
                    c = c.replace(/\u50bb\u4e86\u5427/g, '\u75f4\u4e86');
                    c = c.replace(/\u50bb\u773c/g, '\u77a0\u76ee');
                    c = c.replace(/\u50bb\u5b50/g, '\u75f4\u513f');
                    c = c.replace(/\u50bb\u74dc/g, '\u75f4\u4eba');
                    c = c.replace(/\u50bb/g, '\u75f4');
                    c = c.replace(/\u6211\u53bb/g, '\u566b');
                    c = c.replace(/\u4f60\u5988\u7684/g, '\u4ee4\u5802\u7684');
                    c = c.replace(/\u4ed6\u5a18\u7684/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u5976\u5976\u7684/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u6211\u7684\u5929/g, '\u82cd\u5929');
                    c = c.replace(/\u5929\u554a/g, '\u82cd\u5929');
                    c = c.replace(/\u8001\u5929/g, '\u82cd\u5929');
                    c = c.replace(/\u5988\u5440/g, '\u566b');
                    c = c.replace(/\u6211\u7684\u5988\u5440/g, '\u566b');
                    c = c.replace(/\u5929\u5450/g, '\u82cd\u5929');
                    c = c.replace(/\u9760/g, '\u566b');
                    c = c.replace(/\u53bb\u6b7b/g, '\u5f52\u897f');
                    c = c.replace(/\u5b8c\u86cb/g, '\u7cdf\u7cd5');
                    c = c.replace(/\u8be5\u6b7b/g, '\u8be5\u5f53');
                    c = c.replace(/\u7f3a\u5fb7/g, '\u4e0d\u5fb7');
                    c = c.replace(/\u64cd\u86cb/g, '\u8352\u5510');
                    c = c.replace(/\u626f\u86cb/g, '\u8352\u8bde');
                    c = c.replace(/\u627e\u62bd/g, '\u81ea\u53d6\u5176\u8fb1');
                    c = c.replace(/\u6b20\u63cd/g, '\u8be5\u6253');
                    c = c.replace(/\u627e\u6b7b/g, '\u5bfb\u77ed\u89c1');


                    c = c.replace(/666/g, '\u751a\u5584');
                    c = c.replace(/233/g, '\u6367\u8179');
                    c = c.replace(/2333/g, '\u6367\u8179');
                    c = c.replace(/\u7edd\u4e86/g, '\u7edd\u5999');
                    c = c.replace(/\u771f\u5b9e/g, '\u8bda\u7136');
                    c = c.replace(/\u786e\u5b9e/g, '\u8bda\u7136');
                    c = c.replace(/\u725b\u6279/g, '\u5353\u7edd');


                    c = c.replace(/\u8349\u6ce5\u9a6c/g, '\u8352\u5510');
                    c = c.replace(/\u6211\u65e5/g, '\u8352\u5510');
                    c = c.replace(/\u53bb\u4f60\u5988/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u53bb\u4f60\u5927\u7237/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u53bb\u4f60\u7684/g, '\u53bb\u4f11');
                    c = c.replace(/\u8279/g, '\u8352\u5510');
                    c = c.replace(/\u6cd5\u514b/g, '\u5931\u793c');
                    c = c.replace(/\u6211\u52d2\u4e2a\u53bb/g, '\u566b');
                    c = c.replace(/\u6211\u4e86\u4e2a\u53bb/g, '\u566b');
                    c = c.replace(/\u7279\u4e48\u7684/g, '\u7740\u5b9e');
                    c = c.replace(/\u6eda\u7c97/g, '\u9000\u4e0b');
                    c = c.replace(/\u4ec0\u4e48\u73a9\u610f/g, '\u4f55\u7269');
                    c = c.replace(/\u4ec0\u4e48\u9b3c/g, '\u4f55\u7269');
                    c = c.replace(/\u4ec0\u4e48\u60c5\u51b5/g, '\u4f55\u4e8b');
                    c = c.replace(/\u641e\u6bdb/g, '\u4f55\u4e3a');
                    c = c.replace(/\u641e\u4e8b/g, '\u751f\u4e8b');
                    c = c.replace(/\u4e0d\u662f\u4e1c\u897f/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u54ea\u91cc\u54ea\u91cc/g, '\u5c82\u6562\u5c82\u6562');


                    c = c.replace(/TMD/ig, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/NMD/ig, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/MLGB/ig, '\u8352\u5510');
                    c = c.replace(/WQNMLGB/ig, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/SB/ig, '\u611a\u6627');
                    c = c.replace(/NC/ig, '\u611a\u6627');
                    c = c.replace(/MD/ig, '\u8352\u5510');
                    c = c.replace(/2B/ig, '\u611a\u6627');
                    c = c.replace(/WTF/ig, '\u8352\u5510');
                    c = c.replace(/FUCK/ig, '\u5931\u793c');
                    c = c.replace(/CAO/ig, '\u653e\u8086');


                    c = c.replace(/\u8349\u4f60\u5988/g, '\u653e\u8086');
                    c = c.replace(/\u5e72\u4f60\u5a18/g, '\u653e\u8086');
                    c = c.replace(/\u5e72\u4f60\u5988/g, '\u653e\u8086');
                    c = c.replace(/\u6de6/g, '\u8352\u5510');
                    c = c.replace(/\u6de6\u4f60/g, '\u653e\u8086');
                    c = c.replace(/\u64e6\u4f60/g, '\u653e\u8086');
                    c = c.replace(/\u4f60\u5927\u7237/g, '\u4ee4\u4f2f');
                    c = c.replace(/\u4f60\u59b9/g, '\u4ee4\u59b9');
                    c = c.replace(/\u4f60\u5a18\u7684/g, '\u4ee4\u5802');
                    c = c.replace(/\u4f60\u5976\u5976/g, '\u4ee4\u7956\u6bcd');
                    c = c.replace(/\u4f60\u59e5\u59e5/g, '\u4ee4\u5916\u7956\u6bcd');
                    c = c.replace(/\u53bb\u4f60\u59b9/g, '\u53bb\u4f11');
                    c = c.replace(/\u53bb\u4f60/g, '\u53bb\u4f11');
                    c = c.replace(/\u5988\u86cb/g, '\u8352\u5510');
                    c = c.replace(/\u5988\u4e2a\u86cb/g, '\u8352\u5510');
                    c = c.replace(/\u86cb\u75bc/g, '\u8352\u5510');
                    c = c.replace(/\u5c41\u8bdd/g, '\u80e1\u8a00');
                    c = c.replace(/\u5c41\u4e8b/g, '\u7410\u4e8b');
                    c = c.replace(/\u5173\u4f60\u5c41\u4e8b/g, '\u4e0e\u5c14\u4f55\u5e72');
                    c = c.replace(/\u5173\u6211\u5c41\u4e8b/g, '\u4e0e\u543e\u4f55\u5e72');
                    c = c.replace(/\u4f60\u7b97\u4ec0\u4e48\u4e1c\u897f/g, '\u6c5d\u662f\u4f55\u7269');
                    c = c.replace(/\u7b97\u4ec0\u4e48\u4e1c\u897f/g, '\u662f\u4f55\u7269');
                    c = c.replace(/\u4f60\u4ee5\u4e3a\u4f60\u662f\u8c01/g, '\u6c5d\u81ea\u4ee5\u4e3a\u4f55\u4eba');
                    c = c.replace(/\u4f60\u8c01\u554a/g, '\u6c5d\u4e3a\u4f55\u4eba');
                    c = c.replace(/\u4f60\u662f\u54ea\u4e2a/g, '\u6c5d\u4e3a\u4f55\u4eba');
                    c = c.replace(/\u4f60\u7b97\u8001\u51e0/g, '\u6c5d\u5c45\u4f55\u4f4d');
                    c = c.replace(/\u4f60\u7b97\u54ea\u6839\u8471/g, '\u6c5d\u662f\u4f55\u4eba');


                    c = c.replace(/\u9006\u5929/g, '\u4e56\u50fb');
                    c = c.replace(/\u9006\u5927\u5929/g, '\u4e56\u50fb\u81f3\u6781');
                    c = c.replace(/\u62bd\u8c61/g, '\u4e56\u50fb');
                    c = c.replace(/\u7834\u9632/g, '\u5931\u6001');
                    c = c.replace(/\u6025\u4e86/g, '\u8e81\u77e3');
                    c = c.replace(/\u6025\u4ec0\u4e48/g, '\u4f55\u8e81');
                    c = c.replace(/\u4f60\u6025\u4e86/g, '\u5c14\u8e81\u77e3');
                    c = c.replace(/\u5178\u4e2d\u5178/g, '\u8352\u5510\u81f3\u6781');
                    c = c.replace(/\u96be\u7ef7/g, '\u53ef\u7b11');
                    c = c.replace(/\u868c\u57e0\u4f4f\u4e86/g, '\u5931\u7b11');
                    c = c.replace(/\u7206\u6740/g, '\u5b8c\u80dc');
                    c = c.replace(/\u8584\u7eb1/g, '\u5b8c\u80dc');
                    c = c.replace(/\u81ed\u50bb\u903c/g, '\u9119\u8d31\u611a\u6627');
                    c = c.replace(/\u81ed\u72d7/g, '\u9119\u8d31');
                    c = c.replace(/\u81ed\u5f1f\u5f1f/g, '\u9119\u8d31');
                    c = c.replace(/\u81ed\u59b9\u59b9/g, '\u9119\u8d31');
                    c = c.replace(/\u7ed9\u7237\u722c/g, '\u8bf7\u9000\u4e0b');
                    c = c.replace(/\u7ed9\u8001\u5b50\u722c/g, '\u8bf7\u9000\u4e0b');
                    c = c.replace(/\u722a\u5df4/g, '\u9000\u4e0b');
                    c = c.replace(/\u6446\u70c2/g, '\u81ea\u5f03');
                    c = c.replace(/\u7389\u7389/g, '\u6291\u90c1');
                    c = c.replace(/\u4e50\u8272/g, '\u7cdf\u7c95');
                    c = c.replace(/\u83dc\u9e21/g, '\u62d9\u52a3');
                    c = c.replace(/\u83dc\u72d7/g, '\u62d9\u52a3');
                    c = c.replace(/\u5f69\u7b14/g, '\u62d9\u52a3');
                    c = c.replace(/\u5f69\u6bd4/g, '\u62d9\u52a3');
                    c = c.replace(/\u94c1\u5e9f\u7269/g, '\u65e0\u80fd');
                    c = c.replace(/\u771f\u7684\u83dc/g, '\u8bda\u7136\u62d9\u52a3');
                    c = c.replace(/\u592a\u83dc\u4e86/g, '\u62d9\u52a3\u751a\u77e3');
                    c = c.replace(/\u4f60\u5c31\u8fd9\u70b9\u672c\u4e8b/g, '\u6280\u6b62\u6b64\u8033');
                    c = c.replace(/\u5c31\u8fd9/g, '\u4ec5\u6b64\u800c\u5df2');
                    c = c.replace(/\u5c31\u8fd9\u6c34\u5e73/g, '\u4ec5\u6b64\u6c34\u5e73');
                    c = c.replace(/\u4e0d\u8fc7\u5982\u6b64/g, '\u4e0d\u8fc7\u5c14\u5c14');
                    c = c.replace(/\u4e0d\u884c\u554a\u4f60/g, '\u541b\u5c1a\u6b20\u4f73');
                    c = c.replace(/\u62c9\u80ef/g, '\u6b20\u4f73');
                    c = c.replace(/\u62c9\u8de8/g, '\u6b20\u4f73');
                    c = c.replace(/\u62c9\u95f8/g, '\u6b20\u4f73');
                    c = c.replace(/\u65e0\u8bed/g, '\u65e0\u8a00');
                    c = c.replace(/\u9ebb\u4e86/g, '\u65e0\u5948');
                    c = c.replace(/\u9189\u4e86/g, '\u65e0\u5948');
                    c = c.replace(/\u4f5b\u4e86/g, '\u65e0\u5948');
                    c = c.replace(/\u79bb\u8c31/g, '\u8352\u8c2c');
                    c = c.replace(/\u592a\u79bb\u8c31\u4e86/g, '\u8352\u8c2c\u81f3\u6781');
                    c = c.replace(/\u8fc7\u5206/g, '\u8fc7\u5206');
                    c = c.replace(/\u592a\u8fc7\u5206\u4e86/g, '\u8fc7\u751a\u77e3');
                    c = c.replace(/\u6076\u5fc3\u5fc3/g, '\u4ee4\u4eba\u4f5c\u5455');
                    c = c.replace(/\u574f\u4eba/g, '\u6076\u4eba');
                    c = c.replace(/\u574f\u86cb/g, '\u6076\u5f92');
                    c = c.replace(/\u4f60\u5b8c\u4e86/g, '\u5c14\u4f11\u77e3');
                    c = c.replace(/\u4f60\u7b49\u7740/g, '\u5c14\u4e14\u5019');
                    c = c.replace(/\u4f60\u7ed9\u6211\u7b49\u7740/g, '\u5c14\u4e14\u5019');


                    c = c.replace(/\u4f60\u4ed6\u5988\u7684/g, '\u5176\u6bcd');
                    c = c.replace(/\u4ed6\u5988\u4e86\u4e2a\u903c/g, '\u5176\u6bcd');
                    c = c.replace(/\u4f60\u5988\u4e86\u4e2a\u903c/g, '\u4ee4\u5802');
                    c = c.replace(/\u653e\u4f60\u5988\u7684\u5c41/g, '\u8352\u8c2c');
                    c = c.replace(/\u653e\u4f60\u5a18\u7684\u5c41/g, '\u8352\u8c2c');
                    c = c.replace(/\u72d7\u5a18\u517b\u7684/g, '\u9119\u8d31');
                    c = c.replace(/\u72d7\u4e1c\u897f/g, '\u9119\u8d31');
                    c = c.replace(/\u72d7\u6742\u79cd/g, '\u9119\u8d31');
                    c = c.replace(/\u64cd\u4f60\u5927\u7237/g, '\u653e\u8086');
                    c = c.replace(/\u64cd\u4f60\u59e5\u59e5/g, '\u653e\u8086');
                    c = c.replace(/\u53bb\u4f60\u5976\u5976\u7684/g, '\u5c82\u6709\u6b64\u7406');
                    c = c.replace(/\u4f60\u5988\u6b7b\u4e86/g, '\u4ee4\u5802\u4f11\u77e3');
                    c = c.replace(/\u60f3\u6b7b/g, '\u5bfb\u77ed\u89c1');
                    c = c.replace(/\u6d3b\u8be5/g, '\u81ea\u53d6\u5176\u548e');
                    c = c.replace(/\u627e\u9a82/g, '\u81ea\u53d6\u5176\u8fb1');
                    c = c.replace(/\u6b20\u9a82/g, '\u81ea\u53d6\u5176\u8fb1');
                    c = c.replace(/\u6b20\u6559\u80b2/g, '\u6b20\u6559\u8bf2');
                    c = c.replace(/\u4ec0\u4e48\u4eba\u554a/g, '\u4f55\u7b49\u4eba\u4e5f');
                    c = c.replace(/\u4ec0\u4e48\u6001\u5ea6/g, '\u4f55\u7b49\u6001\u5ea6');
                    c = c.replace(/\u8fd8\u6709\u8c01/g, '\u66f4\u6709\u4f55\u4eba');
                    c = c.replace(/\u670d\u4e0d\u670d/g, '\u670d\u5426');
                    c = c.replace(/\u4e0d\u670d/g, '\u4e0d\u670d');
                    c = c.replace(/\u4e0d\u670d\u6765\u6218/g, '\u4e0d\u670d\u6765\u8fa9');
                    c = c.replace(/\u6765\u6253\u6211\u554a/g, '\u5c82\u6562');
                    c = c.replace(/\u6253\u6211/g, '\u51fb\u6211');
                    c = c.replace(/\u6709\u672c\u4e8b\u4f60/g, '\u82e5\u6709\u80c6\u91cf\u5c14');
                    c = c.replace(/\u6709\u672c\u4e8b/g, '\u82e5\u6709\u80c6\u91cf');
                    c = c.replace(/\u4f60\u5389\u5bb3/g, '\u5c14\u4e86\u5f97');
                    c = c.replace(/\u4f60\u80fd\u8010/g, '\u5c14\u4e86\u5f97');
                    c = c.replace(/\u4f60\u80fd\u4f60\u4e0a/g, '\u5c14\u80fd\u5c14\u4e0a');
                    c = c.replace(/\u5439\u725b/g, '\u5938\u53e3');
                    c = c.replace(/\u5439\u725b\u903c/g, '\u5938\u53e3');
                    c = c.replace(/\u8bf4\u5927\u8bdd/g, '\u5938\u53e3');
                    c = c.replace(/\u5927\u8bdd/g, '\u5927\u8a00');
                    c = c.replace(/\u522b\u5439\u4e86/g, '\u52ff\u5938\u53e3');
                    c = c.replace(/\u7701\u7701\u5427/g, '\u7f62\u4e86');
                    c = c.replace(/\u6d88\u505c\u4f1a\u513f/g, '\u7a0d\u5b89');
                    c = c.replace(/\u6d88\u505c\u4e00\u4e0b/g, '\u7a0d\u5b89');
                    c = c.replace(/\u522b\u5435/g, '\u52ff\u55a7');
                    c = c.replace(/\u522b\u5435\u4e86/g, '\u52ff\u55a7');
                    c = c.replace(/\u5b89\u9759/g, '\u8083\u9759');
                    c = c.replace(/\u5b89\u9759\u70b9/g, '\u8083\u9759');
                    c = c.replace(/\u6d88\u505c/g, '\u7a0d\u5b89');
                    c = c.replace(/\u62ff\u4f60\u6ca1\u529e\u6cd5/g, '\u65e0\u53ef\u5948\u4f55');
                    c = c.replace(/\u771f\u62ff\u4f60\u6ca1\u529e\u6cd5/g, '\u8bda\u7136\u65e0\u53ef\u5948\u4f55');
                    c = c.replace(/\u670d\u4e86\u4f60\u4e86/g, '\u6b3d\u670d');
                    c = c.replace(/\u670d\u4e86/g, '\u6b3d\u670d');
                    c = c.replace(/\u6211\u771f\u670d\u4e86/g, '\u5c0f\u751f\u6b3d\u670d');
                    c = c.replace(/\u65e0\u8bed\u4e86/g, '\u65e0\u8a00\u4ee5\u5bf9');
                    c = c.replace(/\u65e0\u8bdd\u53ef\u8bf4/g, '\u65e0\u8a00\u4ee5\u5bf9');
                    c = c.replace(/\u7b97\u4f60\u72e0/g, '\u5c14\u72e0');
                    c = c.replace(/\u7b97\u4f60\u5389\u5bb3/g, '\u5c14\u4e86\u5f97');
                    c = c.replace(/\u6d3b\u4e45\u89c1/g, '\u65f7\u53e4\u672a\u95fb');
                    c = c.replace(/\u7b2c\u4e00\u6b21\u89c1/g, '\u521d\u89c1');
                    c = c.replace(/\u6ca1\u89c1\u8fc7/g, '\u672a\u66fe\u89c1');
                    c = c.replace(/\u6ca1\u770b\u8fc7/g, '\u672a\u66fe\u89c2');
                    c = c.replace(/\u6ca1\u542c\u8bf4\u8fc7/g, '\u672a\u66fe\u95fb');
                    c = c.replace(/\u5934\u4e00\u56de/g, '\u521d\u6b21');
                    c = c.replace(/\u4e5f\u662f\u7edd\u4e86/g, '\u4ea6\u7edd\u77e3');
                    c = c.replace(/\u4e00\u8138\u61f5\u903c/g, '\u832b\u7136');
                    c = c.replace(/\u61f5\u903c/g, '\u832b\u7136');
                    c = c.replace(/\u61f5\u4e86/g, '\u832b\u7136');
                    c = c.replace(/\u641e\u4e0d\u61c2/g, '\u4e0d\u89e3');
                    c = c.replace(/\u641e\u4e0d\u6e05\u695a/g, '\u672a\u660e');
                    c = c.replace(/\u5f04\u4e0d\u660e\u767d/g, '\u672a\u89e3');
                    c = c.replace(/\u60f3\u4e0d\u901a/g, '\u601d\u4e0d\u5f97\u89e3');
                    c = c.replace(/\u60f3\u4e0d\u660e\u767d/g, '\u601d\u4e0d\u5f97\u89e3');
                    c = c.replace(/\u6ca1\u641e\u61c2/g, '\u672a\u89e3');
                    c = c.replace(/\u6ca1\u5f04\u6e05\u695a/g, '\u672a\u660e');
                    c = c.replace(/\u641e\u4ec0\u4e48/g, '\u4f55\u4e3a');
                    c = c.replace(/\u641e\u4ec0\u4e48\u9b3c/g, '\u4f55\u4e3a');
                    c = c.replace(/\u641e\u4ec0\u4e48\u540d\u5802/g, '\u4f55\u4e3a');
                    c = c.replace(/\u540d\u5802/g, '\u540d\u76ee');
                    c = c.replace(/\u8981\u5e72\u561b/g, '\u6b32\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u60f3\u5e72\u561b/g, '\u5c14\u6b32\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u5230\u5e95\u60f3\u5e72\u561b/g, '\u5c14\u7a76\u7adf\u6b32\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u5230\u5e95\u8981\u600e\u6837/g, '\u5c14\u7a76\u7adf\u6b32\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u60f3\u600e\u6837/g, '\u5c14\u6b32\u4f55\u4e3a');
                    c = c.replace(/\u600e\u4e48\u6837\u4f60\u624d\u6ee1\u610f/g, '\u5982\u4f55\u5c14\u65b9\u6ee1\u610f');
                    c = c.replace(/\u522b\u8fd9\u6837/g, '\u52ff\u5982\u6b64');
                    c = c.replace(/\u522b\u90a3\u6837/g, '\u52ff\u90a3\u822c');
                    c = c.replace(/\u8fd9\u6837\u4e0d\u597d/g, '\u5982\u6b64\u4e0d\u59a5');
                    c = c.replace(/\u90a3\u6837\u4e0d\u884c/g, '\u90a3\u822c\u4e0d\u53ef');
                    c = c.replace(/\u4e0d\u7528\u8fd9\u6837/g, '\u65e0\u987b\u5982\u6b64');
                    c = c.replace(/\u4e0d\u81f3\u4e8e/g, '\u4e0d\u81f3\u4e8e');
                    c = c.replace(/\u4e0d\u81f3\u4e8e\u5427/g, '\u4e0d\u81f3\u4e8e');



                    c = c.replace(/\u670d\u52a1\u5668/g, '\u4f3a\u670d\u5668');
                    c = c.replace(/\u6210\u672c/g, '\u8d44\u8d39');
                    c = c.replace(/\u6bcf\u5e74\u4f1a\u6709(\d+)\u591a\u7684\u8d39\u7528/g, '\u5c81\u9700\u8d44\u8d39$1\u6709\u4f59');
                    c = c.replace(/\u7a33\u5b9a\u7684\u5f00/g, '\u7a33\u56fa\u8fd0\u8f6c');
                    c = c.replace(/\u65e0\u6cd5\u4f7f\u7528/g, '\u4e0d\u5f97\u7528');
                    c = c.replace(/\u505a\u597d\u4ee5\u4e0b/g, '\u9884\u4f5c\u4ee5\u4e0b');
                    c = c.replace(/\u53ea\u8981\u6211/g, '\u4f46\u5c0f\u751f');
                    c = c.replace(/\u5403\u7684\u8d77\u996d/g, '\u5c1a\u80fd\u7cca\u53e3');
                    c = c.replace(/\u5c3d\u91cf/g, '\u7aed\u529b');
                    c = c.replace(/\u7eed\u8d39/g, '\u7eed\u8d44');
                    c = c.replace(/\u8054\u7cfb/g, '\u8054\u7edc');
                    c = c.replace(/\u79c1\u4ebaQQ/g, '\u79c1\u90b8QQ');
                    c = c.replace(/\u5fd8\u8bb0\u7eed\u8d39/g, '\u5fd8\u6000\u7eed\u8d44');
                    c = c.replace(/\u5fd8\u4e86/g, '\u5fd8\u6000');
                    c = c.replace(/\u5fd8\u8bb0/g, '\u5fd8\u6000');
                    c = c.replace(/\u8bc1\u4e66/g, '\u51ed\u8bc1');
                    c = c.replace(/\u4e0d\u786e\u5b9a/g, '\u672a\u6562\u5b9a');
                    c = c.replace(/\u7ecf\u5e38/g, '\u5e38');
                    c = c.replace(/\u5305\u62ec\u6211\u5728\u5185/g, '\u5373\u5c0f\u751f\u4e00\u5e76');
                    c = c.replace(/\u4e0b\u9762\u7684\u63d2\u4ef6/g, '\u4ee5\u4e0b\u63d2\u4ef6');
                    c = c.replace(/\u662f\u5426\u80fd/g, '\u662f\u5426\u53ef');
                    c = c.replace(/\u771f\u6b63\u5b89\u5168/g, '\u8bda\u7136\u5b89\u59a5');
                    c = c.replace(/\u4e0d\u8981\u968f\u610f/g, '\u52ff\u8f7b\u6613');
                    c = c.replace(/\u5b89\u5168\u9677\u9631/g, '\u6697\u9631');
                    c = c.replace(/\u6ca1\u6709\u53d1\u73b0/g, '\u672a\u66fe\u5bdf');
                    c = c.replace(/\u6211\u7684\u601d\u8def/g, '\u5c0f\u751f\u4e4b\u601d');
                    c = c.replace(/\u53ef\u6539\u540d/g, '\u53ef\u6613\u540d');
                    c = c.replace(/\u53eb\u505a/g, '\u5524\u4f5c');
                    c = c.replace(/\u8fd9\u4e2a\u63d2\u4ef6/g, '\u6b64\u63d2\u4ef6');
                    c = c.replace(/\u53ef\u4ee5\u6539\u540d/g, '\u53ef\u6613\u540d');
                    c = c.replace(/\u7684\u98ce\u683c/g, '\u4e4b\u98ce\u9aa8');
                    c = c.replace(/\u98ce\u683c/g, '\u98ce\u9aa8');
                    c = c.replace(/\u601d\u8def/g, '\u601d\u7eea');
                    c = c.replace(/\u60f3\u6cd5/g, '\u5ff5\u60f3');



                    c = c.replace(/^\u6211/, '\u5c0f\u751f');
                    c = c.replace(/\u6211\u4eec/g, '\u6211\u7b49');
                    c = c.replace(/\u4f60\u4eec/g, '\u8bf8\u4f4d');
                    c = c.replace(/\u4ed6\u4eec/g, '\u5f7c\u7b49');
                    c = c.replace(/\u5927\u5bb6/g, '\u8bf8\u4f4d');
                    c = c.replace(/\u5404\u4f4d/g, '\u8bf8\u4f4d');
                    c = c.replace(/\u672c\u4eba/g, '\u533a\u533a\u5c0f\u751f');
                    c = c.replace(/\u67d0\u4eba/g, '\u67d0\u541b');
                    c = c.replace(/\u670b\u53cb/g, '\u53cb\u4eba');
                    c = c.replace(/\u597d\u53cb/g, '\u631a\u53cb');
                    c = c.replace(/\u597d\u670b\u53cb/g, '\u826f\u670b');
                    c = c.replace(/\u540c\u5b66/g, '\u540c\u7a97');
                    c = c.replace(/\u540c\u4e8b/g, '\u540c\u50da');
                    c = c.replace(/\u7fa4\u4e3b/g, '\u7fa4\u4e3b');
                    c = c.replace(/\u697c\u4e3b/g, '\u5e16\u4e3b');
                    c = c.replace(/\u8001\u677f/g, '\u4e1c\u4e3b');
                    c = c.replace(/\u8001\u5e08/g, '\u5148\u751f');
                    c = c.replace(/\u5927\u795e/g, '\u9ad8\u8d24');
                    c = c.replace(/\u5927\u4f6c/g, '\u5148\u8fdb');
                    c = c.replace(/\u4eb2\u7231\u7684/g, '\u656c\u7231\u7684');
                    c = c.replace(/\u5b9d\u8d1d/g, '\u5fc3\u809d');
                    c = c.replace(/\u5144\u5f1f/g, '\u8d24\u5f1f');
                    c = c.replace(/\u59d0\u59b9/g, '\u59ca\u59b9');
                    c = c.replace(/\u54e5\u4eec/g, '\u8bf8\u541b');
                    c = c.replace(/\u5c0f\u5f1f/g, '\u665a\u751f');
                    c = c.replace(/\u5c0f\u59b9/g, '\u665a\u751f');
                    c = c.replace(/\u665a\u8f88/g, '\u540e\u8fdb');
                    c = c.replace(/\u524d\u8f88/g, '\u524d\u8f88');
                    c = c.replace(/\u5e05\u54e5/g, '\u624d\u4fca');
                    c = c.replace(/\u7f8e\u5973/g, '\u4f73\u4eba');
                    c = c.replace(/\u5c0f\u59d0\u59d0/g, '\u59d1\u5a18');
                    c = c.replace(/\u5c0f\u54e5\u54e5/g, '\u90ce\u541b');
                    c = c.replace(/\u5c0f\u59d0\u59d0/g, '\u59d1\u5a18');
                    c = c.replace(/\u8001\u94c1/g, '\u4ec1\u5144');
                    c = c.replace(/\u4eb2\u4eb2/g, '\u541b');
                    c = c.replace(/\u4ed6/g, '\u5f7c');
                    c = c.replace(/\u5979/g, '\u5f7c');
                    c = c.replace(/\u54b1/g, '\u6211\u7b49');
                    c = c.replace(/\u54b1\u4eec/g, '\u6211\u7b49');



                    c = c.replace(/\u4f60\u89c9\u5f97\u5462/g, '\u516c\u5b50\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u4f60\u600e\u4e48\u770b/g, '\u516c\u5b50\u4ee5\u4e3a\u5982\u4f55');
                    c = c.replace(/\u4f60\u610f\u4e0b\u5982\u4f55/g, '\u516c\u5b50\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u4f60\u540c\u610f\u5417/g, '\u516c\u5b50\u53ef\u5e94\u5141\u5426');
                    c = c.replace(/\u4f60\u613f\u610f\u5417/g, '\u516c\u5b50\u53ef\u613f\u5426');
                    c = c.replace(/\u968f\u4fbf\u4f60/g, '\u968f\u516c\u5b50\u4fbf');
                    c = c.replace(/\u4f60\u6765\u5b9a\u5427/g, '\u516c\u5b50\u5b9a\u593a\u4fbf\u662f');
                    c = c.replace(/\u4f60\u51b3\u5b9a\u5427/g, '\u516c\u5b50\u88c1\u593a\u4fbf\u662f');
                    c = c.replace(/\u4f60\u8bf4\u4e86\u7b97/g, '\u516c\u5b50\u4e00\u8a00\u800c\u5b9a');
                    c = c.replace(/\u542c\u4f60\u7684/g, '\u542c\u51ed\u516c\u5b50');
                    c = c.replace(/\u542c\u4f60\u7684\u5427/g, '\u5168\u51ed\u516c\u5b50\u505a\u4e3b');
                    c = c.replace(/\u6709\u52b3\u4f60\u4e86/g, '\u6709\u52b3\u516c\u5b50\u4e86');



                    c = c.replace(/\u4f60/g, '\u5c14');



                    c = c.replace(/\u7238\u7238/g, '\u7236\u4eb2');
                    c = c.replace(/\u5988\u5988/g, '\u6bcd\u4eb2');
                    c = c.replace(/\u7239/g, '\u7236\u4eb2');
                    c = c.replace(/\u5a18/g, '\u6bcd\u4eb2');
                    c = c.replace(/\u7237\u7237/g, '\u7956\u7236');
                    c = c.replace(/\u5976\u5976/g, '\u7956\u6bcd');
                    c = c.replace(/\u5916\u516c/g, '\u5916\u7956\u7236');
                    c = c.replace(/\u5916\u5a46/g, '\u5916\u7956\u6bcd');
                    c = c.replace(/\u59e5\u7237/g, '\u5916\u7956\u7236');
                    c = c.replace(/\u59e5\u59e5/g, '\u5916\u7956\u6bcd');
                    c = c.replace(/\u59d0\u59d0/g, '\u59ca');
                    c = c.replace(/\u59b9\u59b9/g, '\u59b9');
                    c = c.replace(/\u54e5\u54e5/g, '\u5144');
                    c = c.replace(/\u5f1f\u5f1f/g, '\u5f1f');
                    c = c.replace(/\u8001\u5a46/g, '\u5185\u4eba');
                    c = c.replace(/\u8001\u516c/g, '\u5916\u5b50');
                    c = c.replace(/\u5ab3\u5987/g, '\u5185\u5b50');
                    c = c.replace(/\u4e08\u592b/g, '\u5916\u5b50');
                    c = c.replace(/\u59bb\u5b50/g, '\u5185\u5b50');
                    c = c.replace(/\u5b69\u5b50/g, '\u5b69\u513f');
                    c = c.replace(/\u513f\u5b50/g, '\u72ac\u5b50');
                    c = c.replace(/\u5973\u513f/g, '\u5c0f\u5973');
                    c = c.replace(/\u4f60\u5bb6/g, '\u5e9c\u4e0a');
                    c = c.replace(/\u6211\u5bb6/g, '\u5bd2\u820d');
                    c = c.replace(/\u56de\u5bb6/g, '\u5f52\u5bb6');
                    c = c.replace(/\u5230\u5bb6/g, '\u81f3\u5bb6');
                    c = c.replace(/\u5728\u5bb6/g, '\u5728\u5bb6\u4e2d');
                    c = c.replace(/\u6765\u6211\u5bb6/g, '\u6765\u5bd2\u820d');
                    c = c.replace(/\u53bb\u4f60\u5bb6/g, '\u5f80\u5e9c\u4e0a');
                    c = c.replace(/\u4f4f\u54ea\u91cc/g, '\u5c45\u4f55\u5904');
                    c = c.replace(/\u5728\u54ea\u91cc/g, '\u5728\u4f55\u5904');
                    c = c.replace(/\u5728\u8fd9\u91cc/g, '\u5728\u6b64\u5904');
                    c = c.replace(/\u5728\u90a3\u91cc/g, '\u5728\u5f7c\u5904');
                    c = c.replace(/\u8fd9\u8fb9/g, '\u6b64\u5904');
                    c = c.replace(/\u90a3\u8fb9/g, '\u5f7c\u5904');
                    c = c.replace(/\u5230\u5904/g, '\u5404\u5904');
                    c = c.replace(/\u5230\u5904\u90fd/g, '\u5404\u5904\u7686');



                    c = c.replace(/\u4f60\u597d\u5440/g, '\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86');
                    c = c.replace(/\u4f60\u597d/g, '\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86');
                    c = c.replace(/\u5927\u5bb6\u597d/g, '\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86\uff0c\u8bf8\u4f4d\u597d');
                    c = c.replace(/\u5404\u4f4d\u597d/g, '\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86\uff0c\u8bf8\u4f4d\u597d');
                    c = c.replace(/\u5927\u5bb6\u65e9\u4e0a\u597d/g, '\u8bf8\u4f4d\u65e9\u5b89\uff0c\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86');
                    c = c.replace(/\u65e9\u4e0a\u597d/g, '\u65e9\u5b89');
                    c = c.replace(/\u4e0b\u5348\u597d/g, '\u5348\u5b89');
                    c = c.replace(/\u665a\u4e0a\u597d/g, '\u665a\u5b89');
                    c = c.replace(/\u665a\u5b89/g, '\u591c\u5b89');
                    c = c.replace(/\u5728\u5417/g, '\u5c0f\u751f\u5728\uff0c\u4e0d\u77e5\u516c\u5b50/\u59d1\u5a18\u6709\u4f55\u4e8b');
                    c = c.replace(/\u5728\u4e0d\u5728/g, '\u5c0f\u751f\u5728\uff0c\u516c\u5b50\u6709\u4f55\u5429\u5490');
                    c = c.replace(/\u597d\u4e45\u4e0d\u89c1/g, '\u4e45\u8fdd\u4e86\uff0c\u5c0f\u751f\u751a\u662f\u6302\u5ff5');
                    c = c.replace(/\u597d\u4e45\u4e0d\u898b/g, '\u4e45\u8fdd\u4e86\uff0c\u5c0f\u751f\u751a\u662f\u6302\u5ff5');
                    c = c.replace(/\u62dc\u62dc/g, '\u5c0f\u751f\u544a\u8f9e\u4e86');
                    c = c.replace(/\u518d\u89c1/g, '\u5c0f\u751f\u544a\u8f9e');
                    c = c.replace(/\u56de\u89c1/g, '\u5c0f\u751f\u518d\u4f1a');
                    c = c.replace(/\u544a\u8f9e/g, '\u5c0f\u751f\u544a\u8f9e');
                    c = c.replace(/\u5931\u966a/g, '\u5c0f\u751f\u5931\u966a\u4e86');



                    c = c.replace(/\u6211\u4e0d\u4f1a/g, '\u5c0f\u751f\u4e0d\u624d');
                    c = c.replace(/\u6211\u4e0d\u884c/g, '\u5c0f\u751f\u4e0d\u624d');
                    c = c.replace(/\u6211\u505a\u4e0d\u5230/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45\uff0c\u6050\u96be\u80dc\u4efb');
                    c = c.replace(/\u6211\u6ca1\u529e\u6cd5/g, '\u5c0f\u751f\u65e0\u53ef\u5948\u4f55');
                    c = c.replace(/\u6211\u6ca1\u672c\u4e8b/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45');
                    c = c.replace(/\u6211\u89c9\u5f97\u4e5f\u662f/g, '\u5c0f\u751f\u4ea6\u4ee5\u4e3a\u7136');
                    c = c.replace(/\u6211\u4e5f\u89c9\u5f97/g, '\u5c0f\u751f\u4ea6\u4ee5\u4e3a');
                    c = c.replace(/\u6211\u4e5f\u662f/g, '\u5c0f\u751f\u4ea6\u7136');
                    c = c.replace(/\u6211\u540c\u610f/g, '\u5c0f\u751f\u9644\u8bae');
                    c = c.replace(/\u6211\u652f\u6301/g, '\u5c0f\u751f\u8d5e\u540c');
                    c = c.replace(/\u6211\u53cd\u5bf9/g, '\u5c0f\u751f\u4e0d\u6562\u82df\u540c');
                    c = c.replace(/\u6211\u4e0d\u8fd9\u4e48\u8ba4\u4e3a/g, '\u5c0f\u751f\u4e0d\u6562\u82df\u540c');
                    c = c.replace(/\u6211\u8bf7\u5ba2/g, '\u5c0f\u751f\u505a\u4e1c');
                    c = c.replace(/\u6211\u4e70\u5355/g, '\u5c0f\u751f\u4ed8\u8d26');
                    c = c.replace(/\u6211\u8bd5\u8bd5/g, '\u5c0f\u751f\u8bd5\u4e4b');
                    c = c.replace(/\u6211\u770b\u770b/g, '\u5c0f\u751f\u89c2\u4e4b');
                    c = c.replace(/\u6211\u60f3\u60f3/g, '\u5c0f\u751f\u601d\u4e4b');
                    c = c.replace(/\u8bf7\u95ee/g, '\u6597\u80c6\u6562\u95ee');
                    c = c.replace(/\u6211\u60f3\u95ee/g, '\u5c0f\u751f\u6597\u80c6\u4e00\u95ee');
                    c = c.replace(/\u60f3\u95ee/g, '\u5c0f\u751f\u6562\u95ee');
                    c = c.replace(/\u4e0d\u77e5\u9053/g, '\u5c0f\u751f\u4e0d\u77e5');
                    c = c.replace(/\u4e0d\u61c2/g, '\u5c0f\u751f\u4e0d\u89e3');
                    c = c.replace(/\u4e0d\u6562/g, '\u5c0f\u751f\u4e0d\u6562');
                    c = c.replace(/\u53ef\u4ee5\u7684/g, '\u53ef\u4e5f');
                    c = c.replace(/\u4e0d\u624d/g, '\u4e0d\u624d');
                    c = c.replace(/\u6597\u80c6/g, '\u6597\u80c6');
                    c = c.replace(/\u597d\u7684/g, '\u5c0f\u751f\u9075\u547d');
                    c = c.replace(/\u597d\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u884c\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u884c\u4e86/g, '\u53ef\u77e3');
                    c = c.replace(/\u597d\u7684\u597d\u7684/g, '\u5c0f\u751f\u8c28\u9075\u53f0\u547d');
                    c = c.replace(/\u597d\u597d\u597d/g, '\u53ef\u4e5f\u53ef\u4e5f');
                    c = c.replace(/\u884c\u884c\u884c/g, '\u53ef\u4e5f\u53ef\u4e5f');
                    c = c.replace(/\u6ca1\u95ee\u9898/g, '\u5c0f\u751f\u65e0\u5f02\u8bae');
                    c = c.replace(/\u6ca1\u4e8b/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u5173\u7cfb/g, '\u65e0\u59a8');
                    c = c.replace(/\u4e0d\u8981\u7d27/g, '\u65e0\u59a8');
                    c = c.replace(/\u522b\u62c5\u5fc3/g, '\u516c\u5b50\u52ff\u5fe7');
                    c = c.replace(/\u522b\u6015/g, '\u83ab\u6015');
                    c = c.replace(/\u522b\u6025/g, '\u83ab\u6025');
                    c = c.replace(/\u522b\u614c/g, '\u83ab\u614c');
                    c = c.replace(/\u522b\u8fd9\u6837/g, '\u83ab\u8981\u5982\u6b64');
                    c = c.replace(/\u522b\u8bf4\u4e86/g, '\u8bf7\u52ff\u518d\u8a00');
                    c = c.replace(/\u522b\u8d70/g, '\u4e14\u7559\u6b65');
                    c = c.replace(/\u7b49\u4e00\u4e0b/g, '\u4e14\u6162');
                    c = c.replace(/\u7b49\u7b49/g, '\u4e14\u6162');
                    c = c.replace(/\u7a0d\u7b49/g, '\u8bf7\u7a0d\u5019');
                    c = c.replace(/\u7b49\u6211\u4e00\u4e0b/g, '\u5019\u5c0f\u751f\u7247\u523b');
                    c = c.replace(/\u8fc7\u6765/g, '\u524d\u6765');
                    c = c.replace(/\u6765\u5427/g, '\u8bf7\u6765');
                    c = c.replace(/\u53bb\u5427/g, '\u8bf7\u4fbf');
                    c = c.replace(/\u8bf4\u5427/g, '\u4f46\u8bf4\u65e0\u59a8');
                    c = c.replace(/\u8bb2\u5427/g, '\u4f46\u8bb2\u65e0\u59a8');
                    c = c.replace(/\u505a\u5427/g, '\u8bf7\u4fbf');
                    c = c.replace(/\u7b97\u4e86/g, '\u7f62\u4e86\u7f62\u4e86');
                    c = c.replace(/\u7b97\u4e86\u5427/g, '\u7f62\u4e86\u7f62\u4e86');
                    c = c.replace(/\u62c9\u5012/g, '\u7f62\u4e86');
                    c = c.replace(/\u5f97\u4e86\u5427/g, '\u7f62\u4e86');
                    c = c.replace(/\u5dee\u4e0d\u591a\u5f97\u4e86/g, '\u9002\u53ef\u800c\u6b62');
                    c = c.replace(/\u591f\u4e86\u5427/g, '\u8db3\u77e3');
                    c = c.replace(/\u884c\u4e86\u591f\u4e86/g, '\u8db3\u77e3\u8db3\u77e3');
                    c = c.replace(/\u6211\u662f\u8bf4/g, '\u5c0f\u751f\u4e4b\u610f\u662f');
                    c = c.replace(/\u6211\u7684\u610f\u601d\u662f/g, '\u5c0f\u751f\u4e4b\u610f');
                    c = c.replace(/\u4e5f\u5c31\u662f\u8bf4/g, '\u5373\u662f\u8bf4');
                    c = c.replace(/\u4e5f\u5c31\u662f\u8bf4/g, '\u5373\u662f\u8bf4');
                    c = c.replace(/\u6362\u53e5\u8bdd\u8bf4/g, '\u6362\u8a00\u4e4b');
                    c = c.replace(/\u6bd4\u5982/g, '\u8b6c\u5982');
                    c = c.replace(/\u4f8b\u5982/g, '\u8b6c\u5982');
                    c = c.replace(/\u6bd4\u5982\u8bf4/g, '\u8b6c\u5982\u8bf4');



                    c = c.replace(/\u8c22\u8c22\u54d2/g, '\u591a\u8c22\u5c0f\u751f');
                    c = c.replace(/\u8c22\u8c22\u5566/g, '\u591a\u8c22\u5c0f\u751f');
                    c = c.replace(/\u8c22\u5566/g, '\u591a\u8c22');
                    c = c.replace(/\u8c22\u8c22\u4e86/g, '\u611f\u6fc0\u4e0d\u5c3d');
                    c = c.replace(/\u8c22\u8c22/g, '\u591a\u8c22');
                    c = c.replace(/\u591a\u8c22/g, '\u4e0d\u80dc\u611f\u6fc0');
                    c = c.replace(/\u611f\u8c22/g, '\u6df1\u8868\u8c22\u610f');
                    c = c.replace(/\u611f\u6069/g, '\u611f\u5ff5\u5728\u5fc3');
                    c = c.replace(/\u8f9b\u82e6\u4e86/g, '\u6709\u52b3\u4e86');
                    c = c.replace(/\u52b3\u9a7e/g, '\u70e6\u52b3');
                    c = c.replace(/\u8d39\u5fc3\u4e86/g, '\u6709\u52b3\u516c\u5b50\u8d39\u5fc3');
                    c = c.replace(/\u8d39\u5fc3/g, '\u52b3\u5fc3');
                    c = c.replace(/\u9ebb\u70e6\u4f60\u4e86/g, '\u53e8\u6270\u516c\u5b50\u4e86');
                    c = c.replace(/\u9ebb\u70e6/g, '\u53e8\u6270');
                    c = c.replace(/\u6253\u6270\u4e86/g, '\u5c0f\u751f\u53e8\u6270\u4e86');
                    c = c.replace(/\u62b1\u6b49/g, '\u5c0f\u751f\u6b49\u751a');
                    c = c.replace(/\u5bf9\u4e0d\u8d77/g, '\u5c0f\u751f\u5bf9\u4e0d\u4f4f');
                    c = c.replace(/\u4e0d\u597d\u610f\u601d/g, '\u5c0f\u751f\u5931\u793c\u4e86');
                    c = c.replace(/\u6253\u6270\u4e86/g, '\u53e8\u6270\u4e86');
                    c = c.replace(/\u6253\u64fe\u4e86/g, '\u53e8\u6270\u4e86');
                    c = c.replace(/\u5f97\u7f6a/g, '\u5c0f\u751f\u5f97\u7f6a\u4e86');
                    c = c.replace(/\u662f\u6211\u7684\u9519/g, '\u662f\u5c0f\u751f\u4e4b\u8fc7');
                    c = c.replace(/\u6211\u9519\u4e86/g, '\u5c0f\u751f\u77e5\u9519\u4e86');
                    c = c.replace(/\u539f\u8c05\u6211/g, '\u516c\u5b50\u6055\u7f6a');
                    c = c.replace(/\u522b\u602a\u6211/g, '\u516c\u5b50\u83ab\u602a');
                    c = c.replace(/\u522b\u751f\u6c14/g, '\u516c\u5b50\u606f\u6012');
                    c = c.replace(/\u6d88\u6d88\u6c14/g, '\u8bf7\u606f\u6012');
                    c = c.replace(/\u522b\u8fd9\u6837/g, '\u83ab\u8981\u5982\u6b64');
                    c = c.replace(/\u6709\u8bdd\u597d\u8bf4/g, '\u6709\u8bdd\u597d\u5546\u91cf');
                    c = c.replace(/\u6211\u8bf7\u5ba2/g, '\u5c0f\u751f\u505a\u4e1c');
                    c = c.replace(/\u6211\u4e70\u5355/g, '\u5c0f\u751f\u4ed8\u8d26');


                    c = c.replace(/\u4e0d\u5ba2\u6c14/g, '\u4e0d\u987b\u8a00\u8c22');
                    c = c.replace(/\u4e0d\u7528\u8c22/g, '\u4e0d\u987b\u8a00\u8c22');
                    c = c.replace(/\u5c0f\u610f\u601d/g, '\u5fae\u8584\u4e4b\u529b');
                    c = c.replace(/\u5e94\u8be5\u7684/g, '\u5206\u5185\u4e4b\u4e8b');
                    c = c.replace(/\u4e3e\u624b\u4e4b\u52b3/g, '\u4f55\u8db3\u6302\u9f7f');
                    c = c.replace(/\u54ea\u91cc\u54ea\u91cc/g, '\u4e0d\u6562\u5f53');
                    c = c.replace(/\u8fc7\u5956\u4e86/g, '\u8fc7\u5956');
                    c = c.replace(/\u8fc7\u5956/g, '\u8c2c\u8d5e');
                    c = c.replace(/\u732e\u4e11\u4e86/g, '\u732e\u4e11');
                    c = c.replace(/\u89c1\u7b11\u4e86/g, '\u89c1\u7b11');
                    c = c.replace(/\u89c1\u7b11/g, '\u8d3b\u7b11\u5927\u65b9');
                    c = c.replace(/\u5ba2\u6c14\u4e86/g, '\u5ba2\u6c14');
                    c = c.replace(/\u592a\u5ba2\u6c14\u4e86/g, '\u592a\u5ba2\u6c14');
                    c = c.replace(/\u522b\u5ba2\u6c14/g, '\u52ff\u5ba2\u6c14');
                    c = c.replace(/\u8bf4\u5230\u8fd9\u4e2a/g, '\u63d0\u53ca\u6b64\u4e8b');
                    c = c.replace(/\u8bf4\u5230/g, '\u63d0\u53ca');
                    c = c.replace(/\u8bf4\u8d77\u6765/g, '\u8c08\u53ca');
                    c = c.replace(/\u5c31\u8fd9\u4e2a\u4e8b/g, '\u5c31\u6b64\u4e00\u4e8b');
                    c = c.replace(/\u8fd9\u4ef6\u4e8b/g, '\u6b64\u4e8b');
                    c = c.replace(/\u90a3\u4ef6\u4e8b/g, '\u5f7c\u4e8b');
                    c = c.replace(/\u8fd9\u4e2a\u4e8b\u60c5/g, '\u6b64\u4e8b');
                    c = c.replace(/\u90a3\u4e2a\u4e8b\u60c5/g, '\u5f7c\u4e8b');



                    c = c.replace(/\u77e5\u9053\u4e86/g, '\u77e5\u6653\u4e86');
                    c = c.replace(/\u660e\u767d\u4e86/g, '\u4e86\u7136');
                    c = c.replace(/\u61c2\u5566/g, '\u660e\u767d\u4e86');
                    c = c.replace(/\u61c2\u4e86/g, '\u660e\u4e86');
                    c = c.replace(/\u6536\u5230/g, '\u656c\u6089');
                    c = c.replace(/\u6653\u5f97\u4e86/g, '\u77e5\u6653\u4e86');
                    c = c.replace(/\u660e\u767d/g, '\u660e\u4e86');
                    c = c.replace(/\u597d\u6ef4/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u54d2/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u53ed/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u5440/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u54e6/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u561e/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u54af/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u7684/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u6ca1\u95ee\u9898/g, '\u65e0\u59a8');
                    c = c.replace(/\u53ef\u4ee5\u7684/g, '\u53ef');
                    c = c.replace(/\u53ef\u4ee5/g, '\u53ef');
                    c = c.replace(/\u80fd\u4e0d\u80fd/g, '\u53ef\u5426');
                    c = c.replace(/\u53ef\u4e0d\u53ef\u4ee5/g, '\u53ef\u5426');
                    c = c.replace(/\u4e0d\u53ef/g, '\u4e0d\u53ef');
                    c = c.replace(/\u4e0d\u53ef\u4ee5/g, '\u4e0d\u53ef');
                    c = c.replace(/\u4e0d\u80fd/g, '\u4e0d\u53ef');
                    c = c.replace(/\u4e0d\u884c/g, '\u4e0d\u53ef');



                    c = c.replace(/\u4e0d\u662f/g, '\u5e76\u975e');
                    c = c.replace(/\u4e0d\u5bf9/g, '\u4e0d\u59a5');
                    c = c.replace(/\u4e0d\u597d/g, '\u4e0d\u4f73');
                    c = c.replace(/\u4e0d\u8981/g, '\u52ff');
                    c = c.replace(/\u4e0d\u60f3/g, '\u65e0\u610f');
                    c = c.replace(/\u4e0d\u4f1a/g, '\u672a\u80fd');


                    c = c.replace(/\u5403\u996d/g, '\u7528\u9910');
                    c = c.replace(/\u5403\u4e1c\u897f/g, '\u8fdb\u98df');
                    c = c.replace(/\u559d\u6c34/g, '\u996e\u6c34');
                    c = c.replace(/\u559d\u8336/g, '\u54c1\u8336');
                    c = c.replace(/\u559d\u9152/g, '\u996e\u9152');
                    c = c.replace(/\u62bd\u70df/g, '\u5438\u70df');
                    c = c.replace(/\u4e0a\u5395\u6240/g, '\u5982\u5395');
                    c = c.replace(/\u8d77\u5e8a/g, '\u8d77\u8eab');
                    c = c.replace(/\u4e0a\u73ed/g, '\u5f53\u503c');
                    c = c.replace(/\u4e0b\u73ed/g, '\u4e0b\u503c');
                    c = c.replace(/\u8bf7\u5047/g, '\u544a\u5047');
                    c = c.replace(/\u4f11\u606f/g, '\u6b47\u606f');
                    c = c.replace(/\u4f11\u606f\u4e00\u4e0b/g, '\u7a0d\u6b47');
                    c = c.replace(/\u4f11\u606f\u4e00\u4f1a\u513f/g, '\u7a0d\u6b47');
                    c = c.replace(/\u5728\u5fd9/g, '\u5fd9\u788c\u4e2d');
                    c = c.replace(/\u5728\u5fd9\u5417/g, '\u5fd9\u788c\u5426');
                    c = c.replace(/\u6709\u4e8b/g, '\u6709\u8981\u4e8b');
                    c = c.replace(/\u6709\u4e8b\u5417/g, '\u6709\u4f55\u4e8b');
                    c = c.replace(/\u6ca1\u4e8b/g, '\u65e0\u4e8b');
                    c = c.replace(/\u6ca1\u4ec0\u4e48/g, '\u65e0\u751a');
                    c = c.replace(/\u6ca1\u4ec0\u4e48\u4e8b/g, '\u65e0\u751a\u4e8b');
                    c = c.replace(/\u4ec0\u4e48\u4e8b/g, '\u4f55\u4e8b');
                    c = c.replace(/\u51fa\u4e8b\u4e86/g, '\u51fa\u53d8\u6545\u77e3');
                    c = c.replace(/\u51fa\u4ec0\u4e48\u4e8b\u4e86/g, '\u51fa\u4f55\u4e8b\u77e3');
                    c = c.replace(/\u53d1\u751f\u4ec0\u4e48\u4e8b\u4e86/g, '\u53d1\u751f\u4f55\u4e8b');
                    c = c.replace(/\u6ca1\u4e8b\u5427/g, '\u65e0\u59a8\u5426');
                    c = c.replace(/\u8fd8\u597d\u5427/g, '\u5c1a\u53ef\u5426');
                    c = c.replace(/\u6ca1\u95ee\u9898\u5427/g, '\u65e0\u788d\u5426');



                    c = c.replace(/\u4e3a\u4ec0\u4e48/g, '\u4e3a\u4f55');
                    c = c.replace(/\u4e3a\u5565/g, '\u4e3a\u4f55');
                    c = c.replace(/\u5e72\u561b/g, '\u6709\u4f55\u8d35\u5e72');
                    c = c.replace(/\u5e72\u4ec0\u4e48/g, '\u6709\u4f55\u8d35\u5e72');
                    c = c.replace(/\u5e72\u5417/g, '\u6709\u4f55\u8d35\u5e72');
                    c = c.replace(/\u600e\u4e48\u5566/g, '\u5982\u4f55\u4e86');
                    c = c.replace(/\u600e\u4e48\u6837\u4e86/g, '\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u600e\u4e48\u6837/g, '\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u600e\u4e48/g, '\u5982\u4f55');
                    c = c.replace(/\u548b/g, '\u5982\u4f55');
                    c = c.replace(/\u4ec0\u4e48\u6837/g, '\u4f55\u7b49');
                    c = c.replace(/\u4ec0\u4e48\u7684/g, '\u4e4b\u7c7b');
                    c = c.replace(/\u5565\u7684/g, '\u4e4b\u7c7b');
                    c = c.replace(/\u4e4b\u7c7b\u7684/g, '\u4e4b\u7c7b');
                    c = c.replace(/\u4ec0\u4e48/g, '\u4f55');
                    c = c.replace(/\u5565/g, '\u4f55');
                    c = c.replace(/\u8c01/g, '\u4f55\u4eba');
                    c = c.replace(/\u54ea\u4e2a/g, '\u54ea\u4f4d');
                    c = c.replace(/\u54ea\u4e9b/g, '\u54ea\u4e9b');
                    c = c.replace(/\u54ea/g, '\u4f55');
                    c = c.replace(/\u54ea\u91cc/g, '\u4f55\u5904');
                    c = c.replace(/\u54ea\u513f/g, '\u4f55\u5904');
                    c = c.replace(/\u6709\u6ca1\u6709/g, '\u53ef\u6709');
                    c = c.replace(/\u662f\u4e0d\u662f/g, '\u662f\u5426');
                    c = c.replace(/\u8981\u4e0d\u8981/g, '\u53ef\u8981');
                    c = c.replace(/\u597d\u4e0d\u597d/g, '\u53ef\u597d');
                    c = c.replace(/\u884c\u4e0d\u884c/g, '\u53ef\u5426');
                    c = c.replace(/\u5bf9\u4e0d\u5bf9/g, '\u53ef\u5bf9');



                    c = c.replace(/\u56e0\u4e3a\u6240\u4ee5/g, '\u6545\u800c');
                    c = c.replace(/\u56e0\u4e3a/g, '\u56e0');
                    c = c.replace(/\u6240\u4ee5/g, '\u6545');
                    c = c.replace(/\u4f46\u662f/g, '\u7136\u800c');
                    c = c.replace(/\u4e0d\u8fc7/g, '\u4f46');
                    c = c.replace(/\u800c\u4e14/g, '\u4e14');
                    c = c.replace(/\u5e76\u4e14/g, '\u4e14');
                    c = c.replace(/\u6216\u8005/g, '\u6216');
                    c = c.replace(/\u5982\u679c/g, '\u82e5');
                    c = c.replace(/\u867d\u7136/g, '\u867d');
                    c = c.replace(/\u5c3d\u7ba1/g, '\u7eb5\u4f7f');
                    c = c.replace(/\u9664\u975e/g, '\u9664\u975e');
                    c = c.replace(/\u65e0\u8bba/g, '\u65e0\u8bba');
                    c = c.replace(/\u53cd\u6b63/g, '\u6a2a\u7ad6');
                    c = c.replace(/\u603b\u4e4b/g, '\u603b\u4e4b');
                    c = c.replace(/\u4e8e\u662f/g, '\u4e8e\u662f');
                    c = c.replace(/\u5173\u4e8e/g, '\u5173\u4e8e');
                    c = c.replace(/\u5bf9\u4e8e/g, '\u5bf9\u4e8e');
                    c = c.replace(/\u9664\u4e86/g, '\u9664\u5374');
                    c = c.replace(/\u5305\u62ec/g, '\u542b');
                    c = c.replace(/\u6309\u7167/g, '\u4f9d');
                    c = c.replace(/\u6839\u636e/g, '\u636e');
                    c = c.replace(/\u8fd8\u6709/g, '\u5c1a\u6709');
                    c = c.replace(/\u53e6\u5916/g, '\u6b64\u5916');



                    c = c.replace(/\u4e0d\u77e5\u9053/g, '\u4e0d\u77e5');
                    c = c.replace(/\u4e0d\u6653\u5f97/g, '\u4e0d\u77e5');
                    c = c.replace(/\u4e0d\u6e05\u695a/g, '\u672a\u660e');
                    c = c.replace(/\u4e0d\u4e86\u89e3/g, '\u672a\u89e3');
                    c = c.replace(/\u4e0d\u786e\u5b9a/g, '\u672a\u5b9a');
                    c = c.replace(/\u4e0d\u660e/g, '\u672a\u660e');
                    c = c.replace(/\u6653\u5f97/g, '\u77e5\u6653');
                    c = c.replace(/\u660e\u767d/g, '\u660e\u4e86');
                    c = c.replace(/\u7406\u89e3/g, '\u9886\u4f1a');
                    c = c.replace(/\u539f\u6765\u662f\u8fd9\u6837/g, '\u539f\u6765\u5982\u6b64');
                    c = c.replace(/\u539f\u6765\u662f\u4f60/g, '\u539f\u662f\u541b');
                    c = c.replace(/\u539f\u6765\u662f/g, '\u539f\u662f');
                    c = c.replace(/\u662f\u5417/g, '\u5f53\u771f');
                    c = c.replace(/\u5403\u4e86\u5417/g, '\u7528\u996d\u5426');
                    c = c.replace(/\u5403\u4e86/g, '\u7528\u8fc7\u4e86');
                    c = c.replace(/\u5403\u8fc7\u4e86/g, '\u7528\u8fc7\u4e86');
                    c = c.replace(/\u5403\u8fc7/g, '\u98df\u8fc7');
                    c = c.replace(/\u5403\u4e0d\u4e0b/g, '\u98df\u4e0d\u7518\u5473');
                    c = c.replace(/\u559d\u5b8c\u4e86/g, '\u996e\u6bd5');
                    c = c.replace(/\u559d\u676f/g, '\u996e\u4e00\u676f');
                    c = c.replace(/\u51fa\u53bb/g, '\u5916\u51fa');
                    c = c.replace(/\u8fc7\u53bb\u4e86/g, '\u524d\u53bb\u4e86');
                    c = c.replace(/\u8fc7\u53bb\u5427/g, '\u524d\u5f80\u5427');
                    c = c.replace(/\u53bb\u4e86/g, '\u524d\u5f80');
                    c = c.replace(/\u53bb\u4e00\u4e0b/g, '\u5f80\u4e4b');
                    c = c.replace(/\u524d\u53bb/g, '\u524d\u5f80');
                    c = c.replace(/\u6765\u5230\u8fd9\u91cc/g, '\u81f3\u6b64');
                    c = c.replace(/\u8fc7\u6765/g, '\u524d\u6765');
                    c = c.replace(/\u6765\u505a/g, '\u884c\u4e4b');
                    c = c.replace(/\u6211\u6765\u8bf4/g, '\u5c0f\u751f\u8a00');
                    c = c.replace(/\u6211\u8bf4\u7684/g, '\u5c0f\u751f\u6240\u8a00');
                    c = c.replace(/\u8bf4\u7684\u8bdd/g, '\u6240\u8a00');
                    c = c.replace(/\u8fd9\u4e48\u8bf4/g, '\u6b64\u8a00');
                    c = c.replace(/\u95ee\u4e00\u4e0b/g, '\u8be2\u4e4b');
                    c = c.replace(/\u770b\u4e00\u770b/g, '\u89c2\u4e4b');
                    c = c.replace(/\u7ed9\u6211/g, '\u4e88\u5c0f\u751f');
                    c = c.replace(/\u62ff\u4e00\u4e0b/g, '\u53d6\u4e4b');
                    c = c.replace(/\u5e2e\u5fd9/g, '\u76f8\u52a9');
                    c = c.replace(/\u8d2d\u4e70/g, '\u8d2d\u7f6e');
                    c = c.replace(/\u4e70\u4e0b/g, '\u8d2d\u4e4b');
                    c = c.replace(/\u60f3\u53bb/g, '\u6b32\u5f80');
                    c = c.replace(/\u60f3\u8981/g, '\u6b32');
                    c = c.replace(/\u8981\u8ba9/g, '\u4ee4');
                    c = c.replace(/\u544a\u8bc9\u6211/g, '\u544a\u77e5\u5c0f\u751f');
                    c = c.replace(/\u544a\u8bc9/g, '\u544a\u77e5');
                    c = c.replace(/\u6253\u7b97/g, '\u610f\u56fe');


                    c = c.replace(/\u7b49\u4e00\u4e0b/g, '\u7a0d\u5019');
                    c = c.replace(/\u7b49\u4e00\u4f1a\u513f/g, '\u7a0d\u5019');
                    c = c.replace(/\u7b49\u4f1a\u513f/g, '\u7a0d\u5019');
                    c = c.replace(/\u4e00\u4f1a\u513f/g, '\u987b\u81fe');
                    c = c.replace(/\u9a6c\u4e0a/g, '\u5373\u523b');
                    c = c.replace(/\u7acb\u523b/g, '\u5373\u523b');
                    c = c.replace(/\u8d76\u7d27/g, '\u901f\u901f');
                    c = c.replace(/\u5feb\u70b9/g, '\u901f');
                    c = c.replace(/\u6162\u6162\u6765/g, '\u4ece\u5bb9');
                    c = c.replace(/\u6162\u70b9/g, '\u5f90\u5f90');
                    c = c.replace(/\u548b\u529e/g, '\u5948\u4f55');
                    c = c.replace(/\u600e\u4e48\u529e/g, '\u5982\u4f55\u662f\u597d');
                    c = c.replace(/\u548b\u6574/g, '\u5982\u4f55\u662f\u597d');
                    c = c.replace(/\u6ca1\u529e\u6cd5/g, '\u65e0\u53ef\u5948\u4f55');
                    c = c.replace(/\u6ca1\u6cd5\u5b50/g, '\u65e0\u53ef\u5948\u4f55');
                    c = c.replace(/\u53eb\u4e00\u4e0b/g, '\u5524\u4e00\u58f0');
                    c = c.replace(/\u558a\u4e00\u4e0b/g, '\u547c\u4e00\u58f0');
                    c = c.replace(/\u54ed\u4e00\u573a/g, '\u6ce3\u4e00\u573a');
                    c = c.replace(/\u54ed\u8d77\u6765/g, '\u6ce3\u4e0d\u6210\u58f0');
                    c = c.replace(/\u7761\u89c9/g, '\u5c31\u5bdd');
                    c = c.replace(/\u7761\u4e00\u4f1a\u513f/g, '\u5c0f\u61a9');
                    c = c.replace(/\u7761\u4e00\u89c9/g, '\u5b89\u5bdd');
                    c = c.replace(/\u8eba\u4e0b/g, '\u5367\u4e0b');
                    c = c.replace(/\u6362\u4e00\u4e2a/g, '\u6613\u4e4b');
                    c = c.replace(/\u6362\u4e00\u4e0b/g, '\u66f4\u6362');
                    c = c.replace(/\u6539\u4e00\u4e0b/g, '\u66f4\u4e4b');
                    c = c.replace(/\u6539\u5929/g, '\u4ed6\u65e5');
                    c = c.replace(/\u6253\u5f00/g, '\u5f00\u542f');
                    c = c.replace(/\u5173\u6389/g, '\u95ed\u4e4b');
                    c = c.replace(/\u5173\u95ed/g, '\u95ed\u5408');
                    c = c.replace(/\u5173\u4e0a/g, '\u95ed\u4e4b');
                    c = c.replace(/\u4e22\u4e86/g, '\u9057\u5931');
                    c = c.replace(/\u6254\u6389/g, '\u5f03\u4e4b');
                    c = c.replace(/\u4e22\u6389/g, '\u5f03\u4e4b');
                    c = c.replace(/\u6254\u4e86/g, '\u63b7\u4e4b');
                    c = c.replace(/\u6361\u8d77\u6765/g, '\u62fe\u8d77');
                    c = c.replace(/\u6361\u5230/g, '\u62fe\u5f97');
                    c = c.replace(/\u5199\u4e00\u4e0b/g, '\u4e66\u4e4b');
                    c = c.replace(/\u5199\u4e0b\u6765/g, '\u4e66\u4e4b');
                    c = c.replace(/\u5199\u4e1c\u897f/g, '\u4f5c\u4e66');
                    c = c.replace(/\u753b\u4e00\u4e0b/g, '\u7ed8\u4e4b');
                    c = c.replace(/\u8bfb\u4e66/g, '\u9605\u4e66');
                    c = c.replace(/\u770b\u4e00\u4e0b/g, '\u4e00\u89c2');
                    c = c.replace(/\u770b\u4e00\u770b/g, '\u89c2\u4e4b');
                    c = c.replace(/\u542c\u542c/g, '\u95fb\u4e4b');
                    c = c.replace(/\u542c\u4e00\u4e0b/g, '\u95fb\u4e4b');
                    c = c.replace(/\u6d17\u4e00\u4e0b/g, '\u6fef\u4e4b');
                    c = c.replace(/\u6d17\u6fa1/g, '\u6c90\u6d74');
                    c = c.replace(/\u6d17\u8863\u670d/g, '\u6d63\u8863');
                    c = c.replace(/\u64e6\u4e00\u4e0b/g, '\u62ed\u4e4b');
                    c = c.replace(/\u6253\u4e00\u4e0b/g, '\u51fb\u4e4b');
                    c = c.replace(/\u6253\u4eba/g, '\u51fb\u4eba');
                    c = c.replace(/\u6253\u67b6/g, '\u6597\u6bb4');
                    c = c.replace(/\u6572\u95e8/g, '\u53e9\u95e8');
                    c = c.replace(/\u62cd\u4e00\u4e0b/g, '\u62cd\u4e4b');



                    c = c.replace(/\u7684\u8bf4$/, '');
                    c = c.replace(/\u7684\u8bf4/g, '');
                    c = c.replace(/\u561b$/, '');
                    c = c.replace(/\u561b([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u54df$/, '');
                    c = c.replace(/\u54df([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u54af$/, '\u4e86');
                    c = c.replace(/\u54af([\u3002\uff01\uff1f])/, '\u4e86$1');
                    c = c.replace(/\u5566$/, '\u4e86');
                    c = c.replace(/\u5566([\u3002\uff01\uff1f])/, '\u4e86$1');
                    c = c.replace(/\u5566\s/, '\u4e86 ');
                    c = c.replace(/\u54c8$/, '');
                    c = c.replace(/\u54c8([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u5475$/, '');
                    c = c.replace(/\u5475([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u5594$/, '');
                    c = c.replace(/\u5594([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u54e6$/, '');
                    c = c.replace(/\u54e6([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u5416$/, '');
                    c = c.replace(/\u5416([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u6b38$/, '');
                    c = c.replace(/\u6b38([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u8bf6$/, '');
                    c = c.replace(/\u8bf6([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u554a$/, '');
                    c = c.replace(/\u554a([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u5440$/, '');
                    c = c.replace(/\u5440([\u3002\uff01\uff1f.!?\s\uff0c,])/, '$1');
                    c = c.replace(/\u54c8+$/, '');
                    c = c.replace(/\u563f\u563f+$/, '');
                    c = c.replace(/\u563b\u563b+$/, '');
                    c = c.replace(/\u5475\u5475+$/, '');
                    c = c.replace(/\u55ef+/, '\u55ef');



                    c = c.replace(/^\u8bf7\u95ee/, '\u6562\u95ee');
                    c = c.replace(/^\u6211\u60f3\u8bf7\u95ee/, '\u6562\u95ee');
                    c = c.replace(/^\u60f3\u95ee/, '\u6562\u95ee');
                    c = c.replace(/^\u4f46\u662f/, '\u7136\u800c');
                    c = c.replace(/^\u4e0d\u8fc7/, '\u4f46');
                    c = c.replace(/^\u8fd8\u6709/, '\u6b64\u5916');
                    c = c.replace(/^\u90a3/, '\u90a3\u4e48');
                    c = c.replace(/^\u90a3\u4e48/, '\u90a3\u4e48');



                    c = c.replace(/\u7684\u8bdd/g, '\u7684\u8bdd');
                    c = c.replace(/\u7684\u65f6\u5019/g, '\u4e4b\u65f6');
                    c = c.replace(/\u4e4b\u540e/g, '\u4e4b\u540e');
                    c = c.replace(/\u4e4b\u524d/g, '\u4e4b\u524d');
                    c = c.replace(/\u671f\u95f4/g, '\u671f\u95f4');
                    c = c.replace(/\u65b9\u9762/g, '\u65b9\u9762');
                    c = c.replace(/\u539f\u56e0/g, '\u7f18\u7531');
                    c = c.replace(/\u76ee\u7684/g, '\u76ee\u7684');
                    c = c.replace(/\u771f\u7684/g, '\u786e\u7136');
                    c = c.replace(/\u7b97\u4e86/g, '\u7f62\u4e86');
                    c = c.replace(/\u7b97\u4e86\u5427/g, '\u7f62\u4e86');
                    c = c.replace(/\u62c9\u5012/g, '\u4f5c\u7f62');
                    c = c.replace(/\u5f97\u4e86\u5427/g, '\u7f62\u4e86');
                    c = c.replace(/\u968f\u4fbf/g, '\u968f\u610f');
                    c = c.replace(/\u65e0\u6240\u8c13/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u4e8b/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u5173\u7cfb/g, '\u65e0\u59a8');
                    c = c.replace(/\u4e0d\u8981\u7d27/g, '\u65e0\u59a8');
                    c = c.replace(/\u5bf9\u4e86/g, '\u5bf9\u4e86');
                    c = c.replace(/\u6ca1\u9519/g, '\u6b63\u662f');
                    c = c.replace(/\u662f\u7684/g, '\u6b63\u662f');


                    c = c.replace(/\u8bdd\u8bf4/g, '\u8a00\u53ca');
                    c = c.replace(/\u8bf4\u8d77\u6765/g, '\u63d0\u53ca');
                    c = c.replace(/\u8bf4\u5b9e\u8bdd/g, '\u5b9e\u8a00');
                    c = c.replace(/\u8bb2\u771f/g, '\u5b9e\u8a00');
                    c = c.replace(/\u8bb2\u9053\u7406/g, '\u6309\u7406');
                    c = c.replace(/\u4e00\u76f4/g, '\u59cb\u7ec8');
                    c = c.replace(/\u603b\u662f/g, '\u6bcf\u6bcf');
                    c = c.replace(/\u7ecf\u5e38/g, '\u5e38\u5e38');
                    c = c.replace(/\u6709\u65f6/g, '\u65f6\u800c');
                    c = c.replace(/\u5076\u5c14/g, '\u5076');
                    c = c.replace(/\u7a81\u7136/g, '\u9aa4\u7136');
                    c = c.replace(/\u5ffd\u7136/g, '\u5ffd');
                    c = c.replace(/\u7ec8\u4e8e/g, '\u7ec8');
                    c = c.replace(/\u4ece\u6765/g, '\u5411\u6765');
                    c = c.replace(/\u5df2\u7ecf/g, '\u5df2\u7136');
                    c = c.replace(/\u65e9\u5c31/g, '\u65e9\u5df2');
                    c = c.replace(/\u8fd8\u6ca1/g, '\u5c1a\u672a');
                    c = c.replace(/\u7b2c\u4e00\u6b21/g, '\u521d\u6b21');
                    c = c.replace(/\u4e00\u5f00\u59cb/g, '\u521d\u59cb');
                    c = c.replace(/\u6700\u540e/g, '\u6700\u7ec8');
                    c = c.replace(/\u7ed3\u675f/g, '\u7ec8\u4e86');
                    c = c.replace(/\u5f00\u59cb/g, '\u59cb');
                    c = c.replace(/\u54c8\u54c8\u54c8/g, '\u54c8\u54c8');
                    c = c.replace(/\u8981\u6b7b\u4e86/g, '\u751a\u77e3');
                    c = c.replace(/\u7d2f\u6b7b\u4e86/g, '\u75b2\u751a');
                    c = c.replace(/\u997f\u6b7b\u4e86/g, '\u9965\u751a');
                    c = c.replace(/\u56f0\u6b7b\u4e86/g, '\u56f0\u751a');
                    c = c.replace(/\u70e6\u6b7b\u4e86/g, '\u70e6\u751a');
                    c = c.replace(/\u6c14\u6b7b\u4e86/g, '\u6c14\u715e\u6211\u4e5f');
                    c = c.replace(/\u7b11\u6b7b\u4e86/g, '\u4ee4\u4eba\u6367\u8179');
                    c = c.replace(/\u597d\u65e0\u804a/g, '\u751a\u662f\u65e0\u8da3');
                    c = c.replace(/\u65e0\u804a/g, '\u65e0\u8da3');
                    c = c.replace(/\u597d\u7d2f/g, '\u75b2\u751a');
                    c = c.replace(/\u597d\u56f0/g, '\u56f0\u751a');
                    c = c.replace(/\u597d\u997f/g, '\u9965\u751a');
                    c = c.replace(/\u597d\u70e6/g, '\u70e6\u751a');
                    c = c.replace(/\u597d\u6c14/g, '\u607c\u751a');
                    c = c.replace(/\u597d\u96be/g, '\u8270\u751a');
                    c = c.replace(/\u597d\u7b80\u5355/g, '\u6613\u8033');
                    c = c.replace(/\u7b80\u5355/g, '\u7b80\u6613');
                    c = c.replace(/\u590d\u6742/g, '\u7e41\u6742');
                    c = c.replace(/\u5f00\u5fc3/g, '\u6b23\u60a6');
                    c = c.replace(/\u9ad8\u5174/g, '\u6b23\u60a6');
                    c = c.replace(/\u96be\u8fc7/g, '\u60b2\u621a');
                    c = c.replace(/\u4f24\u5fc3/g, '\u4f24\u6000');
                    c = c.replace(/\u751f\u6c14/g, '\u607c\u6012');
                    c = c.replace(/\u5bb3\u6015/g, '\u60f6\u6050');
                    c = c.replace(/\u7d27\u5f20/g, '\u5fd0\u5fd1');
                    c = c.replace(/\u60ca\u8bb6/g, '\u60ca\u8be7');
                    c = c.replace(/\u611f\u52a8/g, '\u611f\u6000');
                    c = c.replace(/\u5e78\u798f/g, '\u5e78\u751a');
                    c = c.replace(/\u8f9b\u82e6/g, '\u8f9b\u52b3');
                    c = c.replace(/\u53ef\u601c/g, '\u53ef\u60af');
                    c = c.replace(/\u5389\u5bb3/g, '\u4e86\u5f97');
                    c = c.replace(/\u4f18\u79c0/g, '\u4f18\u5f02');
                    c = c.replace(/\u806a\u660e/g, '\u806a\u6167');
                    c = c.replace(/\u6f02\u4eae/g, '\u79c0\u4e3d');
                    c = c.replace(/\u597d\u542c/g, '\u60a6\u8033');
                    c = c.replace(/\u597d\u5403/g, '\u5473\u7f8e');
                    c = c.replace(/\u597d\u73a9/g, '\u6709\u8da3');


                    c = c.replace(/\u521a\u624d/g, '\u65b9\u624d');
                    c = c.replace(/\u521a\u521a/g, '\u65b9\u624d');
                    c = c.replace(/\u4ee5\u540e/g, '\u65e5\u540e');
                    c = c.replace(/\u540e\u6765/g, '\u5176\u540e');
                    c = c.replace(/\u4ee5\u524d/g, '\u4ece\u524d');
                    c = c.replace(/\u7136\u540e/g, '\u800c\u540e');
                    c = c.replace(/\u63a5\u7740/g, '\u7ee7\u800c');
                    c = c.replace(/\u968f\u540e/g, '\u65cb\u5373');
                    c = c.replace(/\u4e0d\u4e45/g, '\u672a\u51e0');
                    c = c.replace(/\u6ca1\u591a\u4e45/g, '\u672a\u51e0');
                    c = c.replace(/\u4e0d\u4e00\u4f1a\u513f/g, '\u672a\u51e0');
                    c = c.replace(/\u5f88\u5feb/g, '\u4fc4\u800c');
                    c = c.replace(/\u77ac\u95f4/g, '\u5239\u90a3');
                    c = c.replace(/\u8f6c\u773c/g, '\u8f6c\u77ac');
                    c = c.replace(/\u534a\u5929/g, '\u826f\u4e45');
                    c = c.replace(/\u597d\u4e45/g, '\u826f\u4e45');
                    c = c.replace(/\u5f88\u4e45/g, '\u826f\u4e45');
                    c = c.replace(/\u5f88\u5c11/g, '\u9c9c\u5c11');
                    c = c.replace(/\u5f88\u591a/g, '\u8bf8\u591a');
                    c = c.replace(/\u592a\u591a/g, '\u8fc7\u591a');
                    c = c.replace(/\u5dee\u4e0d\u591a/g, '\u5927\u62b5');
                    c = c.replace(/\u597d\u50cf/g, '\u4f3c\u662f');
                    c = c.replace(/\u4e5f\u8bb8/g, '\u6216\u8bb8');
                    c = c.replace(/\u5927\u6982/g, '\u5927\u62b5');
                    c = c.replace(/\u5e94\u8be5/g, '\u5e94\u5f53');
                    c = c.replace(/\u53ef\u80fd/g, '\u6216\u8bb8');
                    c = c.replace(/\u80af\u5b9a/g, '\u5fc5\u7136');
                    c = c.replace(/\u4e00\u5b9a/g, '\u5fc5\u5b9a');
                    c = c.replace(/\u4e0d\u7528/g, '\u65e0\u987b');
                    c = c.replace(/\u4e0d\u9700\u8981/g, '\u65e0\u987b');
                    c = c.replace(/\u6ca1\u5fc5\u8981/g, '\u65e0\u987b');
                    c = c.replace(/\u4e0d\u5f97\u4e0d/g, '\u4e0d\u5f97\u5df2');
                    c = c.replace(/\u5fcd\u4e0d\u4f4f/g, '\u4e0d\u7981');
                    c = c.replace(/\u5fcd\u4e0d\u4f4f\u4e86/g, '\u4e0d\u7981');
                    c = c.replace(/\u53d7\u4e0d\u4e86/g, '\u4e0d\u582a');
                    c = c.replace(/\u53d7\u4e0d\u4e86\u4e86/g, '\u4e0d\u582a');


                    c = c.replace(/\u4f60\u8fd9\u4e2a\u4eba/g, '\u541b');
                    c = c.replace(/\u4f60\u8fd9\u79cd\u4eba/g, '\u541b\u8fd9\u7b49');
                    c = c.replace(/\u50cf\u4f60\u8fd9\u6837\u7684/g, '\u5982\u541b\u8fd9\u822c');
                    c = c.replace(/\u50cf\u4ed6\u8fd9\u6837\u7684/g, '\u5982\u5f7c\u8fd9\u822c');
                    c = c.replace(/\u50cf\u6211\u8fd9\u6837\u7684/g, '\u5982\u5c0f\u751f\u8fd9\u822c');
                    c = c.replace(/\u8bf4\u5b9e\u8bdd/g, '\u5b9e\u8a00\u76f8\u544a');
                    c = c.replace(/\u8bb2\u771f\u7684/g, '\u5b9e\u4e0d\u76f8\u7792');
                    c = c.replace(/\u8bf4\u771f\u7684/g, '\u5b9e\u4e0d\u76f8\u7792');
                    c = c.replace(/\u8bf4\u53e5\u5b9e\u8bdd/g, '\u5b9e\u8a00\u76f8\u544a');
                    c = c.replace(/\u6211\u89c9\u5f97/g, '\u5c0f\u751f\u4ee5\u4e3a');
                    c = c.replace(/\u6211\u8ba4\u4e3a/g, '\u5c0f\u751f\u4ee5\u4e3a');
                    c = c.replace(/\u4e2a\u4eba\u89c9\u5f97/g, '\u5c0f\u751f\u4ee5\u4e3a');
                    c = c.replace(/\u5728\u6211\u770b\u6765/g, '\u4ee5\u5c0f\u751f\u89c2\u4e4b');
                    c = c.replace(/\u7167\u6211\u8bf4/g, '\u4f9d\u5c0f\u751f\u4e4b\u89c1');
                    c = c.replace(/\u6211\u7684\u610f\u89c1\u662f/g, '\u5c0f\u751f\u4e4b\u89c1');
                    c = c.replace(/\u8fd9\u6837/g, '\u5982\u6b64');
                    c = c.replace(/\u90a3\u6837/g, '\u90a3\u822c');
                    c = c.replace(/\u5c31\u8fd9\u6837/g, '\u5982\u6b64');
                    c = c.replace(/\u8fd9\u6837\u5427/g, '\u5982\u6b64\u8fd9\u822c');
                    c = c.replace(/\u8fd9\u6837\u7684\u8bdd/g, '\u5982\u6b64');
                    c = c.replace(/\u544a\u522b/g, '\u8f9e\u522b');
                    c = c.replace(/\u9053\u522b/g, '\u8f9e\u522b');
                    c = c.replace(/\u6253\u4e2a\u62db\u547c/g, '\u81f4\u610f');
                    c = c.replace(/\u95ee\u5019/g, '\u81f4\u610f');
                    c = c.replace(/\u8c22\u8c22\u5927\u5bb6/g, '\u591a\u8c22\u8bf8\u4f4d');
                    c = c.replace(/\u771f\u5fc3\u611f\u8c22/g, '\u8bda\u5fc3\u81f4\u8c22');
                    c = c.replace(/\u7531\u8877\u611f\u8c22/g, '\u7531\u8877\u81f4\u8c22');
                    c = c.replace(/\u4e07\u5206\u611f\u8c22/g, '\u4e0d\u80dc\u611f\u6fc0');
                    c = c.replace(/\u4e07\u5206\u62b1\u6b49/g, '\u7f6a\u751a');
                    c = c.replace(/\u771f\u7684\u5f88\u62b1\u6b49/g, '\u8bda\u60f6\u8bda\u6050');
                    c = c.replace(/\u6df1\u8868\u6b49\u610f/g, '\u6b49\u759a\u6b8a\u6df1');
                    c = c.replace(/\u7ed9\u4f60\u6dfb\u9ebb\u70e6\u4e86/g, '\u53e8\u6270\u4e86');
                    c = c.replace(/\u4e0d\u597d\u610f\u601d\u9ebb\u70e6\u4f60\u4e86/g, '\u53e8\u6270\u4e86');
                    c = c.replace(/\u4e0d\u7528\u7684/g, '\u4e0d\u5fc5');
                    c = c.replace(/\u4e0d\u7528\u4e86/g, '\u4e0d\u5fc5');
                    c = c.replace(/\u5230\u6b64\u4e3a\u6b62/g, '\u81f3\u6b64\u4e3a\u6b62');
                    c = c.replace(/\u5c31\u8fd9\u6837\u5427/g, '\u5982\u6b64\u4fbf\u597d');
                    c = c.replace(/\u5c31\u5230\u8fd9\u91cc/g, '\u81f3\u6b64');
                    c = c.replace(/\u542c\u4f60\u7684/g, '\u542c\u541b\u4e00\u8a00');
                    c = c.replace(/\u542c\u4f60\u7684\u5427/g, '\u542c\u541b\u4e00\u8a00');
                    c = c.replace(/\u90fd\u884c/g, '\u5747\u53ef');
                    c = c.replace(/\u90fd\u53ef\u4ee5/g, '\u5747\u53ef');
                    c = c.replace(/\u600e\u4e48\u90fd\u884c/g, '\u5982\u4f55\u7686\u53ef');
                    c = c.replace(/\u600e\u6837\u90fd\u884c/g, '\u5982\u4f55\u7686\u53ef');
                    c = c.replace(/\u968f\u4fbf\u5427/g, '\u968f\u610f');
                    c = c.replace(/\u4f60\u5b9a\u5427/g, '\u541b\u5b9a\u593a');
                    c = c.replace(/\u4f60\u6765\u51b3\u5b9a/g, '\u541b\u5b9a\u593a');
                    c = c.replace(/\u4f60\u8bf4\u4e86\u7b97/g, '\u541b\u4e00\u8a00\u5b9a\u593a');
                    c = c.replace(/\u4f60\u8bf4\u4e86\u7b97\u5427/g, '\u541b\u4e00\u8a00\u5b9a\u593a');
                    c = c.replace(/\u4f9d\u4f60/g, '\u4f9d\u541b');
                    c = c.replace(/\u90fd\u4f9d\u4f60/g, '\u7686\u4f9d\u541b');
                    c = c.replace(/\u5168\u542c\u4f60\u7684/g, '\u5168\u4f9d\u541b');
                    c = c.replace(/\u5c31\u8fd9\u6837\u5b9a\u4e86/g, '\u5982\u6b64\u5b9a\u77e3');


                    c = c.replace(/\u524d\u5929/g, '\u524d\u65e5');
                    c = c.replace(/\u540e\u5929/g, '\u540e\u65e5');
                    c = c.replace(/\u4e0a\u5348/g, '\u5348\u524d');
                    c = c.replace(/\u4e2d\u5348/g, '\u5348\u95f4');
                    c = c.replace(/\u4e0b\u5348/g, '\u5348\u540e');
                    c = c.replace(/\u665a\u4e0a/g, '\u665a\u95f4');
                    c = c.replace(/\u591c\u91cc/g, '\u591c\u95f4');
                    c = c.replace(/\u51cc\u6668/g, '\u51cc\u6668');
                    c = c.replace(/\u65e9\u4e0a/g, '\u6e05\u6668');


                    c = c.replace(/\u592a\u597d\u4e86/g, '\u751a\u4f73');
                    c = c.replace(/\u592a\u68d2\u4e86/g, '\u751a\u4f73');
                    c = c.replace(/\u597d\u5389\u5bb3/g, '\u4e86\u5f97');
                    c = c.replace(/\u4e86\u4e0d\u8d77/g, '\u4e86\u5f97');
                    c = c.replace(/\u597d\u60e8/g, '\u582a\u601c');
                    c = c.replace(/\u592a\u60e8\u4e86/g, '\u582a\u601c');
                    c = c.replace(/\u597d\u53ef\u601c/g, '\u582a\u601c');
                    c = c.replace(/\u597d\u597d\u7b11/g, '\u6367\u8179');
                    c = c.replace(/\u7b11\u6b7b\u4e86/g, '\u6367\u8179');
                    c = c.replace(/\u592a\u597d\u7b11\u4e86/g, '\u6367\u8179');
                    c = c.replace(/\u7b11\u6b7b\u6211\u4e86/g, '\u6367\u8179');
                    c = c.replace(/\u65e0\u804a/g, '\u4e4f\u5473');
                    c = c.replace(/\u592a\u65e0\u804a\u4e86/g, '\u4e4f\u5473');
                    c = c.replace(/\u597d\u65e0\u804a/g, '\u4e4f\u5473');
                    c = c.replace(/\u771f\u68d2/g, '\u751a\u4f73');
                    c = c.replace(/\u597d\u68d2/g, '\u751a\u4f73');


                    c = c.replace(/\u600e\u4e48\u56de\u4e8b/g, '\u6b64\u4e3a\u4f55\u6545');
                    c = c.replace(/\u600e\u4e48\u56de\u4e8b\u554a/g, '\u6b64\u4e3a\u4f55\u6545');
                    c = c.replace(/\u4f60\u5728\u5e72\u561b/g, '\u5c14\u5728\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u5728\u5e72\u4ec0\u4e48/g, '\u5c14\u5728\u4f55\u4e3a');
                    c = c.replace(/\u4f60\u5728\u505a\u5565/g, '\u5c14\u5728\u4f55\u4e3a');
                    c = c.replace(/\u505a\u5565/g, '\u4f55\u4e3a');
                    c = c.replace(/\u5e72\u5565/g, '\u4f55\u4e3a');
                    c = c.replace(/\u600e\u4e48\u4e86\u4f60/g, '\u541b\u4f55\u6545');
                    c = c.replace(/\u4f60\u6ca1\u4e8b\u5427/g, '\u541b\u65e0\u6059\u5426');
                    c = c.replace(/\u4f60\u8fd8\u597d\u5417/g, '\u541b\u5c1a\u53ef\u5b89\u5426');
                    c = c.replace(/\u4f60\u600e\u4e48\u6837/g, '\u541b\u5982\u4f55');
                    c = c.replace(/\u4f60\u597d\u5417/g, '\u541b\u5b89\u597d\u5426');
                    c = c.replace(/\u4f60\u662f\u8c01/g, '\u541b\u4e3a\u4f55\u4eba');
                    c = c.replace(/\u8c01\u554a/g, '\u4f55\u4eba');
                    c = c.replace(/\u54ea\u4e2a\u662f/g, '\u4f55\u8005\u662f');
                    c = c.replace(/\u54ea\u4e2a/g, '\u4f55\u8005');
                    c = c.replace(/\u54ea\u91cc\u53bb/g, '\u5f80\u4f55\u5904');
                    c = c.replace(/\u53bb\u54ea\u91cc/g, '\u5f80\u4f55\u5904');
                    c = c.replace(/\u53bb\u54ea\u91cc\u4e86/g, '\u5f80\u4f55\u5904\u77e3');


                    c = c.replace(/\u6211\u6765\u4e86/g, '\u5c0f\u751f\u81f3\u77e3');
                    c = c.replace(/\u6211\u6765\u5566/g, '\u5c0f\u751f\u81f3\u77e3');
                    c = c.replace(/\u6211\u6765\u4e86\u54e6/g, '\u5c0f\u751f\u81f3\u77e3');
                    c = c.replace(/\u6765\u4e86\u6765\u4e86/g, '\u6765\u4e86');
                    c = c.replace(/\u6211\u8d70\u4e86/g, '\u5c0f\u751f\u544a\u8f9e');
                    c = c.replace(/\u6211\u5148\u8d70\u4e86/g, '\u5c0f\u751f\u5148\u884c\u544a\u9000');
                    c = c.replace(/\u8d70\u4e86\u8d70\u4e86/g, '\u544a\u8f9e');
                    c = c.replace(/\u6211\u56de\u6765\u5566/g, '\u5c0f\u751f\u5f52\u77e3');
                    c = c.replace(/\u56de\u6765\u4e86/g, '\u5f52\u77e3');
                    c = c.replace(/\u56de\u6765\u4e86\u54e6/g, '\u5f52\u77e3');
                    c = c.replace(/\u6211\u4e0d\u884c\u4e86/g, '\u5c0f\u751f\u4e0d\u652f');
                    c = c.replace(/\u6211\u53d7\u4e0d\u4e86\u4e86/g, '\u4e0d\u582a\u5176\u6270');
                    c = c.replace(/\u6211\u6295\u964d/g, '\u5c0f\u751f\u8ba4\u8f93');
                    c = c.replace(/\u6211\u653e\u5f03/g, '\u5c0f\u751f\u653e\u5f03');
                    c = c.replace(/\u7b49\u7b49\u6211/g, '\u4e14\u5019\u5c0f\u751f');
                    c = c.replace(/\u7b49\u6211\u4e00\u4e0b/g, '\u7a0d\u5019\u5c0f\u751f');
                    c = c.replace(/\u7b49\u6211/g, '\u5019\u5c0f\u751f');


                    c = c.replace(/\u800c\u4e14/g, '\u4e14');
                    c = c.replace(/\u5e76\u4e14/g, '\u4e14');
                    c = c.replace(/\u518d\u8bf4\u4e86/g, '\u518d\u8005');
                    c = c.replace(/\u518d\u8bf4/g, '\u518d\u8005');
                    c = c.replace(/\u4e5f\u5c31\u662f\u8bf4/g, '\u5373\u662f\u8bf4');
                    c = c.replace(/\u6362\u53e5\u8bdd\u8bf4/g, '\u6362\u8a00\u4e4b');
                    c = c.replace(/\u603b\u7684\u6765\u8bf4/g, '\u603b\u800c\u8a00\u4e4b');
                    c = c.replace(/\u603b\u4e4b/g, '\u603b\u800c\u8a00\u4e4b');
                    c = c.replace(/\u5176\u5b9e/g, '\u5b9e\u5219');
                    c = c.replace(/\u5176\u5b9e\u5427/g, '\u5b9e\u5219');
                    c = c.replace(/\u5f53\u7136/g, '\u81ea\u7136');
                    c = c.replace(/\u5f53\u7136\u53ef\u4ee5/g, '\u81ea\u7136\u53ef\u4ee5');
                    c = c.replace(/\u5f53\u7136\u5566/g, '\u81ea\u7136');
                    c = c.replace(/\u5e76\u4e0d\u662f/g, '\u5e76\u975e');
                    c = c.replace(/\u771f\u7684\u5417/g, '\u5f53\u771f\u5426');
                    c = c.replace(/\u771f\u7684\u5047\u7684/g, '\u5f53\u771f\u5426');
                    c = c.replace(/\u4e0d\u662f\u5427/g, '\u975e\u4e5f');
                    c = c.replace(/\u4e0d\u4f1a\u5427/g, '\u4e0d\u81f4\u4e8e\u6b64');
                    c = c.replace(/\u4e0d\u80fd\u5427/g, '\u4e0d\u81f4\u4e8e\u6b64');
                    c = c.replace(/\u4e0d\u662f\u771f\u7684\u5427/g, '\u5c82\u6709\u6b64\u4e8b');
                    c = c.replace(/\u771f\u7684/g, '\u5f53\u771f');


                    c = c.replace(/\u4e5f\u884c/g, '\u4ea6\u53ef');
                    c = c.replace(/\u4e5f\u53ef\u4ee5/g, '\u4ea6\u53ef');
                    c = c.replace(/\u597d\u7684\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u597d\u54e6/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u5440/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u54d2/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u6ef4/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u561b/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u53ed/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u5466/g, '\u597d\u7684');
                    c = c.replace(/\u6ca1\u6709\u5173\u7cfb/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u4e8b\u6ca1\u4e8b/g, '\u65e0\u59a8\u65e0\u59a8');
                    c = c.replace(/\u4e0d\u788d\u4e8b/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u4e8b\u7684/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u5173\u7cfb\u7684/g, '\u65e0\u59a8');
                    c = c.replace(/\u6ca1\u95ee\u9898\u4e86/g, '\u65e0\u788d\u77e3');
                    c = c.replace(/\u6653\u5f97\u4e86/g, '\u77e5\u6653\u4e86');
                    c = c.replace(/\u77e5\u9053\u4e86\u54e6/g, '\u77e5\u6653\u4e86');
                    c = c.replace(/\u77e5\u9053\u4e86\u5566/g, '\u77e5\u6653\u4e86');
                    c = c.replace(/\u597d\u7684\u597d\u7684/g, '\u597d\u7684');
                    c = c.replace(/\u597d\u597d\u597d/g, '\u53ef\u77e3');
                    c = c.replace(/\u884c\u884c\u884c/g, '\u53ef\u77e3');
                    c = c.replace(/\u5bf9\u5bf9\u5bf9/g, '\u8bda\u7136');
                    c = c.replace(/\u662f\u7684\u662f\u7684/g, '\u8bda\u7136');
                    c = c.replace(/\u6ca1\u9519\u6ca1\u9519/g, '\u6b63\u662f\u6b63\u662f');
                    c = c.replace(/\u662f\u7684\u6ca1\u9519/g, '\u8bda\u7136');
                    c = c.replace(/\u5bf9\u7684/g, '\u8bda\u7136');
                    c = c.replace(/\u5bf9\u7684\u5440/g, '\u8bda\u7136');
                    c = c.replace(/\u8bf4\u7684\u5bf9/g, '\u8bda\u7136');
                    c = c.replace(/\u8bf4\u7684\u6ca1\u9519/g, '\u8bda\u7136');
                    c = c.replace(/\u8bf4\u5f97\u5bf9/g, '\u8bda\u7136');


                    c = c.replace(/\u53bb\u73a9/g, '\u6e38\u73a9');
                    c = c.replace(/\u51fa\u53bb\u73a9/g, '\u51fa\u6e38');
                    c = c.replace(/\u51fa\u53bb\u73a9\u5566/g, '\u51fa\u6e38');
                    c = c.replace(/\u53bb\u5403\u996d/g, '\u53bb\u7528\u9910');
                    c = c.replace(/\u53bb\u5403\u4e1c\u897f/g, '\u53bb\u8fdb\u98df');
                    c = c.replace(/\u53bb\u4e70\u4e1c\u897f/g, '\u53bb\u8d2d\u7269');
                    c = c.replace(/\u901b\u8857/g, '\u95f2\u901b');
                    c = c.replace(/\u901b\u5546\u573a/g, '\u6e38\u5546\u8086');
                    c = c.replace(/\u53bb\u4e0a\u73ed/g, '\u53bb\u5f53\u503c');
                    c = c.replace(/\u53bb\u5b66\u6821/g, '\u5f80\u5b66\u5802');
                    c = c.replace(/\u53bb\u4e0a\u8bfe/g, '\u5f80\u6388\u8bfe');
                    c = c.replace(/\u4e0b\u8bfe\u4e86/g, '\u4e0b\u5802');
                    c = c.replace(/\u653e\u5b66\u4e86/g, '\u653e\u8bfe');
                    c = c.replace(/\u653e\u5b66\u5566/g, '\u653e\u8bfe');
                    c = c.replace(/\u56de\u5bb6\u5427/g, '\u5f52\u5bb6\u5427');
                    c = c.replace(/\u56de\u5bb6\u5566/g, '\u5f52\u5bb6\u77e3');
                    c = c.replace(/\u56de\u5bb6\u4e86/g, '\u5f52\u5bb6\u77e3');
                    c = c.replace(/\u5230\u5bb6\u4e86/g, '\u81f3\u5bb6\u77e3');
                    c = c.replace(/\u5230\u5bb6\u5566/g, '\u81f3\u5bb6\u77e3');
                    c = c.replace(/\u51fa\u95e8\u4e86/g, '\u51fa\u95e8\u77e3');
                    c = c.replace(/\u51fa\u95e8\u5566/g, '\u51fa\u95e8\u77e3');
                    c = c.replace(/\u51fa\u95e8\u53bb/g, '\u5916\u51fa');
                    c = c.replace(/\u56de\u6765/g, '\u5f52\u6765');
                    c = c.replace(/\u56de\u6765\u5566/g, '\u5f52\u6765\u77e3');
                    c = c.replace(/\u56de\u6765\u4e86/g, '\u5f52\u6765\u77e3');
                    c = c.replace(/\u8fc7\u6765\u4e00\u4e0b/g, '\u524d\u6765\u4e00\u4e0b');
                    c = c.replace(/\u8fc7\u6765\u770b\u770b/g, '\u524d\u6765\u4e00\u89c2');



                    c = c.replace(/\u6211\u53bb\u53bb\u5c31\u56de/g, '\u5c0f\u751f\u53bb\u53bb\u4fbf\u56de');
                    c = c.replace(/\u9a6c\u4e0a\u6765/g, '\u5c0f\u751f\u5373\u523b\u4fbf\u6765');
                    c = c.replace(/\u9a6c\u4e0a\u5230/g, '\u5c0f\u751f\u5373\u523b\u4fbf\u81f3');
                    c = c.replace(/\u8fd9\u5c31\u6765/g, '\u5c0f\u751f\u8fd9\u4fbf\u6765');
                    c = c.replace(/\u8fd9\u5c31\u53bb/g, '\u5c0f\u751f\u8fd9\u4fbf\u53bb');
                    c = c.replace(/\u8fd9\u5c31\u8d70/g, '\u5c0f\u751f\u8fd9\u4fbf\u8d70');
                    c = c.replace(/\u6211\u53bb\u4e86/g, '\u5c0f\u751f\u53bb\u77e3');
                    c = c.replace(/\u6211\u56de\u6765\u4e86/g, '\u5c0f\u751f\u5f52\u77e3');
                    c = c.replace(/\u8d70\u5566/g, '\u5c0f\u751f\u53bb\u77e3');
                    c = c.replace(/\u8d70\u54af/g, '\u5c0f\u751f\u53bb\u77e3');
                    c = c.replace(/\u8d70\u4e86/g, '\u5c0f\u751f\u53bb\u77e3');
                    c = c.replace(/\u6765\u4e86/g, '\u5c0f\u751f\u6765\u77e3');
                    c = c.replace(/\u6765\u5566/g, '\u5c0f\u751f\u6765\u77e3');
                    c = c.replace(/\u5728\u7684/g, '\u5c0f\u751f\u5728\u7684');
                    c = c.replace(/\u6211\u8fd8\u5728/g, '\u5c0f\u751f\u5c1a\u5728');
                    c = c.replace(/\u6211\u5148/g, '\u5c0f\u751f\u5148');
                    c = c.replace(/\u6211\u731c/g, '\u5c0f\u751f\u731c');
                    c = c.replace(/\u8bf4\u5f97\u597d/g, '\u516c\u5b50\u6240\u8a00\u6781\u662f');
                    c = c.replace(/\u8bf4\u5f97\u5bf9/g, '\u516c\u5b50\u6240\u8a00\u6781\u662f');
                    c = c.replace(/\u6709\u9053\u7406/g, '\u516c\u5b50\u6b64\u8a00\u6709\u7406');
                    c = c.replace(/\u6709\u7406/g, '\u6709\u7406');
                    c = c.replace(/\u597d\u4e3b\u610f/g, '\u516c\u5b50\u597d\u4e3b\u610f');
                    c = c.replace(/\u597d\u529e\u6cd5/g, '\u5999\u8ba1');
                    c = c.replace(/\u771f\u806a\u660e/g, '\u516c\u5b50\u806a\u6167');
                    c = c.replace(/\u771f\u6709\u624d/g, '\u516c\u5b50\u9ad8\u624d');
                    c = c.replace(/\u771f\u6709\u60f3\u6cd5/g, '\u516c\u5b50\u5353\u89c1');
                    c = c.replace(/\u5389\u5bb3\u5389\u5bb3/g, '\u516c\u5b50\u4e86\u5f97');
                    c = c.replace(/\u4f69\u670d\u4f69\u670d/g, '\u5c0f\u751f\u4f69\u670d');
                    c = c.replace(/\u670d\u4e86/g, '\u5c0f\u751f\u4f69\u670d');



                    c = c.replace(/\u597d\u4e0d\u597d/g, '\u53ef\u5426');
                    c = c.replace(/\u884c\u4e0d\u884c/g, '\u53ef\u5426');
                    c = c.replace(/\u53ef\u4e0d\u53ef\u4ee5/g, '\u53ef\u5426');
                    c = c.replace(/\u80fd\u4e0d\u80fd/g, '\u53ef\u5426');
                    c = c.replace(/\u53ef\u4ee5\u5417/g, '\u53ef\u4e4e');
                    c = c.replace(/\u884c\u5417/g, '\u53ef\u4e4e');
                    c = c.replace(/\u597d\u5417/g, '\u53ef\u4e4e');
                    c = c.replace(/\u884c\u4e86\u5427/g, '\u53ef\u77e3\u4e4e');
                    c = c.replace(/\u591f\u4e86\u6ca1/g, '\u8db3\u77e3\u5426');



                    c = c.replace(/\u77e5\u9053\u4e86/g, '\u5c0f\u751f\u77e5\u6653\u4e86');
                    c = c.replace(/\u660e\u767d\u4e86/g, '\u5c0f\u751f\u660e\u4e86');
                    c = c.replace(/\u61c2\u4e86/g, '\u5c0f\u751f\u61c2\u4e86');
                    c = c.replace(/\u6536\u5230/g, '\u5c0f\u751f\u656c\u6089');
                    c = c.replace(/\u4e86\u89e3/g, '\u5c0f\u751f\u9886\u4f1a');
                    c = c.replace(/\u6211\u61c2\u4e86/g, '\u5c0f\u751f\u660e\u767d\u4e86');
                    c = c.replace(/\u6211\u660e\u767d\u4e86/g, '\u5c0f\u751f\u4e86\u7136\u4e8e\u80f8');
                    c = c.replace(/\u539f\u6765\u5982\u6b64/g, '\u539f\u6765\u5982\u6b64\uff0c\u5c0f\u751f\u53d7\u6559\u4e86');
                    c = c.replace(/\u539f\u6765\u662f\u8fd9\u6837/g, '\u539f\u6765\u8fd9\u822c\uff0c\u5c0f\u751f\u53d7\u6559\u4e86');
                    c = c.replace(/\u8fd9\u6837\u554a/g, '\u539f\u6765\u8fd9\u822c');
                    c = c.replace(/\u597d\u7684\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u90a3\u597d\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u90a3\u884c\u5427/g, '\u4e5f\u7f62');
                    c = c.replace(/\u5c31\u8fd9\u6837\u5427/g, '\u5982\u6b64\u4fbf\u597d');
                    c = c.replace(/\u90a3\u5c31\u8fd9\u6837\u5427/g, '\u5982\u6b64\u4fbf\u597d');
                    c = c.replace(/\u968f\u4fbf/g, '\u968f\u610f');
                    c = c.replace(/\u65e0\u6240\u8c13/g, '\u65e0\u59a8');
                    c = c.replace(/\u90fd\u884c/g, '\u7686\u53ef');
                    c = c.replace(/\u90fd\u53ef\u4ee5/g, '\u7686\u53ef');
                    c = c.replace(/\u600e\u4e48\u90fd\u884c/g, '\u5982\u4f55\u7686\u53ef');



                    c = c.replace(/\u5bf9\u4e0d\u8d77\u5927\u5bb6/g, '\u5c0f\u751f\u6709\u8d1f\u8bf8\u4f4d\u6240\u671b');
                    c = c.replace(/\u62d6\u540e\u817f\u4e86/g, '\u5c0f\u751f\u62d6\u7d2f\u8bf8\u4f4d\u4e86');
                    c = c.replace(/\u9ebb\u70e6\u5927\u5bb6\u4e86/g, '\u53e8\u6270\u8bf8\u4f4d\u4e86');
                    c = c.replace(/\u732e\u4e11\u4e86/g, '\u5c0f\u751f\u732e\u4e11\u4e86');



                    c = c.replace(/\u65e9\u4e0a\u597d\u5440/g, '\u65e9\u5b89\uff0c\u5c0f\u751f\u8fd9\u53a2\u6709\u793c\u4e86\uff0c\u4e0d\u77e5\u59d1\u5a18/\u516c\u5b50\u4eca\u65e5\u53ef\u5b89\u597d');
                    c = c.replace(/\u65e9\u5440/g, '\u5c0f\u751f\u7ed9\u59d1\u5a18\u8bf7\u5b89\u4e86\uff0c\u613f\u59d1\u5a18\u4eca\u65e5\u7b11\u53e3\u5e38\u5f00');
                    c = c.replace(/\u65e9\u54c7/g, '\u5c0f\u751f\u7ed9\u59d1\u5a18\u8bf7\u5b89\u4e86');
                    c = c.replace(/\u591c\u89c2\u5929\u8c61/g, '\u5c0f\u751f\u591c\u89c2\u5929\u8c61\uff0c\u89c1\u7d2b\u6c14\u4e1c\u6765\uff0c\u4fbf\u77e5\u59d1\u5a18\u4eca\u65e5\u5fc5\u6709\u559c\u4e8b');
                    c = c.replace(/\u7b11\u53e3\u5e38\u5f00/g, '\u613f\u59d1\u5a18\u7b11\u53e3\u5e38\u5f00\uff0c\u5c0f\u751f\u4fbf\u5fc3\u6ee1\u610f\u8db3\u4e86');
                    c = c.replace(/\u60f3\u5c14\u4e86/g, '\u5c0f\u751f\u65b9\u624d\u8fd8\u5728\u60f3\u59d1\u5a18\uff0c\u4e0d\u60f3\u59d1\u5a18\u5c31\u6765\u4e86\uff0c\u771f\u662f\u5fc3\u6709\u7075\u7280');
                    c = c.replace(/\u5728\u5fd9\u5565/g, '\u4e0d\u77e5\u59d1\u5a18\u5728\u5fd9\u4e9b\u4ec0\u4e48\uff0c\u5c0f\u751f\u5192\u6627\u6253\u6270\u4e86');
                    c = c.replace(/\u5fd9\u4ec0\u4e48\u5462/g, '\u4e0d\u77e5\u59d1\u5a18\u5728\u5fd9\u4e9b\u4ec0\u4e48\uff0c\u5c0f\u751f\u5192\u6627\u4e86');



                    c = c.replace(/\u59d0\u59d0\u813e\u6c14/g, '\u59d0\u59d0\u7684\u813e\u6c14\u597d\u5927\uff0c\u4e0d\u50cf\u5c0f\u751f\uff0c\u53ea\u4f1a\u5fc3\u75bc\u59d0\u59d0');
                    c = c.replace(/\u59d0\u59d0\u597d\u51f6/g, '\u59d0\u59d0\u597d\u51f6\u54e6\uff0c\u4e0d\u50cf\u5c0f\u751f\uff0c\u53ea\u4f1a\u5fc3\u75bc\u59d0\u59d0');
                    c = c.replace(/\u5c14\u597d\u51f6/g, '\u5c14\u8fd9\u822c\u51f6\uff0c\u82e5\u662f\u5c0f\u751f\uff0c\u5b9a\u662f\u820d\u4e0d\u5f97\u7684');
                    c = c.replace(/\u5c14\u5bf9\u8c61/g, '\u5c14\u5bf9\u8c61\u600e\u4e48\u4e0d\u61c2\u5f97\u73cd\u60dc\u5462\uff1f\u82e5\u662f\u5c0f\u751f\uff0c\u5b9a\u628a\u5c14\u6367\u5728\u624b\u5fc3\u91cc');
                    c = c.replace(/\u5c14\u5973\u670b\u53cb/g, '\u5c14\u5973\u670b\u53cb\u597d\u51f6\u54e6\uff0c\u4e0d\u50cf\u5c0f\u751f\uff0c\u5c0f\u751f\u53ea\u4f1a\u7ed9\u5c14\u5265\u8461\u8404');
                    c = c.replace(/\u5c14\u7537\u670b\u53cb/g, '\u5c14\u7537\u670b\u53cb\u8fd9\u822c\u5bf9\u5c14\uff0c\u82e5\u662f\u5c0f\u751f\uff0c\u5b9a\u662f\u4e0d\u820d\u5f97\u7684');
                    c = c.replace(/\u4ed6\u8fd9\u6837\u5bf9\u5c14/g, '\u4ed6\u8fd9\u822c\u60f9\u5c14\u751f\u6c14\uff0c\u82e5\u662f\u5c0f\u751f\u5728\u8eab\u8fb9\uff0c\u5b9a\u662f\u4e0d\u820d\u5f97\u7684');
                    c = c.replace(/\u4ed6\u600e\u4e48\u8fd9\u6837/g, '\u4ed6\u8fd9\u822c\u60f9\u5c14\u751f\u6c14\uff0c\u82e5\u662f\u5c0f\u751f\u5728\u8eab\u8fb9\uff0c\u5b9a\u662f\u4e0d\u820d\u5f97\u7684');
                    c = c.replace(/\u60f9\u5c14\u751f\u6c14/g, '\u4ed6\u8fd9\u822c\u60f9\u5c14\u751f\u6c14\uff0c\u82e5\u662f\u5c0f\u751f\u5728\u8eab\u8fb9\uff0c\u5b9a\u662f\u4e0d\u820d\u5f97\u7684');
                    c = c.replace(/\u5fc3\u75bc\u5c14/g, '\u5c0f\u751f\u7b28\u5634\u62d9\u820c\uff0c\u4e0d\u4f1a\u54c4\u4eba\uff0c\u53ea\u80fd\u9ed8\u9ed8\u966a\u7740\u59d1\u5a18\u4e86');
                    c = c.replace(/\u5fc3\u75bc\u59d0\u59d0/g, '\u59d0\u59d0\u83ab\u6c14\uff0c\u4e0d\u50cf\u5c0f\u751f\uff0c\u53ea\u4f1a\u5fc3\u75bc\u59d0\u59d0');
                    c = c.replace(/\u5c0f\u751f\u8eab\u5b50\u5f31/g, '\u5c0f\u751f\u8eab\u5b50\u5f31\uff0c\u5439\u4e0d\u5f97\u98ce\uff0c\u5c31\u4e0d\u966a\u516c\u5b50\u53bb\u51d1\u70ed\u95f9\u4e86');
                    c = c.replace(/\u5439\u4e0d\u5f97\u98ce/g, '\u5c0f\u751f\u8eab\u5b50\u5f31\uff0c\u5439\u4e0d\u5f97\u98ce\uff0c\u5c31\u4e0d\u966a\u516c\u5b50\u53bb\u51d1\u70ed\u95f9\u4e86');
                    c = c.replace(/\u54e5\u54e5\u8fd9\u4e48\u597d/g, '\u54e5\u54e5\u8fd9\u4e48\u597d\uff0c\u4ed6\u600e\u4e48\u4e0d\u61c2\u5f97\u73cd\u60dc\u5462\uff1f\u82e5\u662f\u5c0f\u751f\uff0c\u5b9a\u628a\u54e5\u54e5\u6367\u5728\u624b\u5fc3\u91cc');
                    c = c.replace(/\u59d0\u59d0\u8fd9\u4e48\u597d/g, '\u59d0\u59d0\u8fd9\u4e48\u597d\uff0c\u4ed6\u600e\u4e48\u4e0d\u61c2\u5f97\u73cd\u60dc\u5462\uff1f\u82e5\u662f\u5c0f\u751f\uff0c\u5b9a\u628a\u59d0\u59d0\u6367\u5728\u624b\u5fc3\u91cc');
                    c = c.replace(/\u4e0d\u50cf\u5c0f\u751f/g, '\u4e0d\u4f3c\u5c0f\u751f\uff0c\u53ea\u4f1a\u5fc3\u75bc\u59d1\u5a18');



                    c = c.replace(/\u5343\u9519\u4e07\u9519/g, '\u5343\u9519\u4e07\u9519\uff0c\u90fd\u662f\u5c0f\u751f\u7684\u9519\uff0c\u59d1\u5a18\u6253\u9a82\u4fbf\u662f\uff0c\u83ab\u8981\u6c14\u574f\u4e86\u8eab\u5b50');
                    c = c.replace(/\u90fd\u662f\u6211\u7684\u9519/g, '\u5343\u9519\u4e07\u9519\uff0c\u90fd\u662f\u5c0f\u751f\u7684\u9519\uff0c\u59d1\u5a18\u83ab\u8981\u6c14\u574f\u4e86\u8eab\u5b50');
                    c = c.replace(/\u662f\u6211\u7684\u9505/g, '\u662f\u5c0f\u751f\u4e4b\u8fc7\uff0c\u59d1\u5a18\u606f\u6012');
                    c = c.replace(/\u9762\u58c1\u601d\u8fc7/g, '\u5c0f\u751f\u77e5\u9519\u4e86\uff0c\u8fd9\u5c31\u53bb\u9762\u58c1\u601d\u8fc7');
                    c = c.replace(/\u6211\u77e5\u9519\u4e86/g, '\u5c0f\u751f\u77e5\u9519\u4e86\uff0c\u59d1\u5a18\u6253\u9a82\u4fbf\u662f\uff0c\u83ab\u8981\u6c14\u574f\u4e86\u8eab\u5b50');
                    c = c.replace(/\u5c0f\u751f\u77e5\u9519\u4e86/g, '\u5c0f\u751f\u77e5\u9519\u4e86\uff0c\u8fd9\u5c31\u53bb\u9762\u58c1\u601d\u8fc7\uff0c\u6ca1\u6709\u59d1\u5a18\u7684\u4f20\u5524\u7edd\u4e0d\u51fa\u6765');
                    c = c.replace(/\u5510\u7a81\u4e86/g, '\u662f\u5c0f\u751f\u5510\u7a81\u4e86\uff0c\u5192\u72af\u4e86\u59d1\u5a18\uff0c\u8fd8\u671b\u59d1\u5a18\u6d77\u6db5');
                    c = c.replace(/\u5192\u72af\u4e86/g, '\u662f\u5c0f\u751f\u5192\u72af\u4e86\uff0c\u8fd8\u671b\u59d1\u5a18\u6d77\u6db5');
                    c = c.replace(/\u5927\u4eba\u4e0d\u8bb0\u5c0f\u4eba\u8fc7/g, '\u5c0f\u751f\u8fd9\u53a2\u7ed9\u60a8\u4f5c\u63d6\u4e86\uff0c\u60a8\u5927\u4eba\u4e0d\u8bb0\u5c0f\u4eba\u8fc7\uff0c\u9976\u4e86\u5c0f\u751f\u8fd9\u56de\u5427');
                    c = c.replace(/\u9976\u4e86\u6211/g, '\u516c\u5b50/\u59d1\u5a18\u9976\u4e86\u5c0f\u751f\u8fd9\u56de\u5427');
                    c = c.replace(/\u522b\u751f\u6c14\u4e86/g, '\u516c\u5b50/\u59d1\u5a18\u606f\u6012\uff0c\u83ab\u8981\u6c14\u574f\u4e86\u8eab\u5b50');
                    c = c.replace(/\u6d88\u6d88\u6c14/g, '\u516c\u5b50/\u59d1\u5a18\u6d88\u6d88\u6c14\uff0c\u5c0f\u751f\u7ed9\u60a8\u8d54\u4e0d\u662f\u4e86');



                    c = c.replace(/\u8584\u7530\u9700\u8981\u6253\u7406/g, '\u5c0f\u751f\u5bb6\u4e2d\u8fd8\u6709\u51e0\u4ea9\u8584\u7530\u9700\u8981\u6253\u7406\uff0c\u5c31\u5148\u544a\u8f9e\u4e86');
                    c = c.replace(/\u5bb6\u91cc\u6709\u4e8b/g, '\u5c0f\u751f\u5bb6\u4e2d\u8fd8\u6709\u51e0\u4ea9\u8584\u7530\u9700\u8981\u6253\u7406\uff0c\u5c31\u5148\u544a\u8f9e\u4e86');
                    c = c.replace(/\u5148\u8d70\u4e86/g, '\u5c0f\u751f\u5bb6\u4e2d\u8fd8\u6709\u8981\u4e8b\uff0c\u5148\u544a\u8f9e\u4e86');
                    c = c.replace(/\u591c\u8272\u5df2\u6df1/g, '\u591c\u8272\u5df2\u6df1\uff0c\u5c0f\u751f\u5c31\u4e0d\u6270\u59d1\u5a18\u6e05\u68a6\u4e86\uff0c\u54b1\u4eec\u660e\u65e5\u518d\u53d9');
                    c = c.replace(/\u592a\u665a\u4e86/g, '\u591c\u8272\u5df2\u6df1\uff0c\u5c0f\u751f\u5c31\u4e0d\u6270\u59d1\u5a18\u6e05\u68a6\u4e86');
                    c = c.replace(/\u8be5\u7761\u4e86/g, '\u591c\u8272\u5df2\u6df1\uff0c\u5c0f\u751f\u5c31\u4e0d\u6270\u59d1\u5a18\u6e05\u68a6\u4e86\uff0c\u660e\u65e5\u518d\u53d9');
                    c = c.replace(/\u5e2e\u4e0d\u4e0a\u5fd9/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45\uff0c\u5b9e\u5728\u5e2e\u4e0d\u4e0a\u59d1\u5a18\u8fd9\u4e2a\u5fd9\uff0c\u60ed\u6127\u60ed\u6127');
                    c = c.replace(/\u624d\u758f\u5b66\u6d45/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45\uff0c\u60ed\u6127\u60ed\u6127');
                    c = c.replace(/\u65e0\u80fd\u4e3a\u529b/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45\uff0c\u5b9e\u5728\u65e0\u80fd\u4e3a\u529b');
                    c = c.replace(/\u5e2e\u4e0d\u5230\u5c14/g, '\u5c0f\u751f\u624d\u758f\u5b66\u6d45\uff0c\u5e2e\u4e0d\u4e0a\u516c\u5b50\u8fd9\u4e2a\u5fd9\uff0c\u60ed\u6127\u60ed\u6127');
                    c = c.replace(/\u9752\u5c71\u4e0d\u6539/g, '\u9752\u5c71\u4e0d\u6539\uff0c\u7eff\u6c34\u957f\u6d41\uff0c\u5c0f\u751f\u8fd9\u4fbf\u9000\u4e0b\u4e86\uff0c\u59d1\u5a18\u4fdd\u91cd');
                    c = c.replace(/\u7eff\u6c34\u957f\u6d41/g, '\u9752\u5c71\u4e0d\u6539\uff0c\u7eff\u6c34\u957f\u6d41\uff0c\u5c0f\u751f\u8fd9\u4fbf\u9000\u4e0b\u4e86');
                    c = c.replace(/\u6539\u65e5\u518d\u805a/g, '\u9752\u5c71\u4e0d\u6539\uff0c\u7eff\u6c34\u957f\u6d41\uff0c\u54b1\u4eec\u6539\u65e5\u518d\u805a');
                    c = c.replace(/\u4e0b\u6b21\u4e00\u5b9a/g, '\u5c0f\u751f\u6390\u6307\u4e00\u7b97\uff0c\u4eca\u65e5\u4e0d\u5b9c\u804a\u5929\uff0c\u54b1\u4eec\u6539\u65e5\u518d\u805a');
                    c = c.replace(/\u4e0d\u5b9c\u804a\u5929/g, '\u5c0f\u751f\u6390\u6307\u4e00\u7b97\uff0c\u4eca\u65e5\u4e0d\u5b9c\u804a\u5929\uff0c\u54b1\u4eec\u6539\u65e5\u518d\u805a');
                    c = c.replace(/\u4eca\u65e5\u4e4f\u4e86/g, '\u5c0f\u751f\u4eca\u65e5\u4e4f\u4e86\uff0c\u8fd9\u4fbf\u544a\u9000\uff0c\u6055\u4e0d\u8fdc\u9001');
                    c = c.replace(/\u6539\u65e5\u518d\u804a/g, '\u5c0f\u751f\u4eca\u65e5\u4e4f\u4e86\uff0c\u8fd9\u4fbf\u544a\u9000\uff0c\u6539\u65e5\u518d\u53d9');
                    c = c.replace(/\u544a\u9000\u4e86/g, '\u5c0f\u751f\u544a\u9000\u4e86\uff0c\u59d1\u5a18/\u516c\u5b50\u4fdd\u91cd');
                    c = c.replace(/\u516c\u5b50\u4fdd\u91cd/g, '\u5c0f\u751f\u8fd9\u4fbf\u9000\u4e0b\u4e86\uff0c\u59d1\u5a18/\u516c\u5b50\u4fdd\u91cd');



                    c = c.replace(/\u60f3\u5c14/g, '\u5c0f\u751f\u4e0d\u624d\uff0c\u613f\u4ee5\u4f59\u751f\u4e3a\u8058\uff0c\u6362\u59d1\u5a18\u4e00\u4e16\u6b22\u989c');
                    c = c.replace(/\u60f3\u59d1\u5a18\u4e86/g, '\u5c0f\u751f\u4e0d\u624d\uff0c\u613f\u4ee5\u4f59\u751f\u4e3a\u8058\uff0c\u6362\u59d1\u5a18\u4e00\u4e16\u6b22\u989c');
                    c = c.replace(/\u559c\u6b22\u5c14/g, '\u4e16\u4eba\u7686\u8c13\u5c0f\u751f\u6e05\u51b7\uff0c\u5374\u4e0d\u77e5\u5c0f\u751f\u7684\u4e00\u8154\u6e29\u67d4\uff0c\u7686\u7ed9\u4e86\u59d1\u5a18');
                    c = c.replace(/\u559c\u6b22\u59d1\u5a18/g, '\u4e16\u4eba\u7686\u8c13\u5c0f\u751f\u6e05\u51b7\uff0c\u5374\u4e0d\u77e5\u5c0f\u751f\u7684\u4e00\u8154\u6e29\u67d4\uff0c\u7686\u7ed9\u4e86\u59d1\u5a18');
                    c = c.replace(/\u7231\u4e0a\u5c14/g, '\u5c0f\u751f\u672c\u65e0\u610f\u60f9\u7ea2\u5c18\uff0c\u5948\u4f55\u59d1\u5a18\u60ca\u9e3f\u4e00\u77a5\uff0c\u4e71\u4e86\u5c0f\u751f\u9053\u5fc3');
                    c = c.replace(/\u7231\u59d1\u5a18/g, '\u5c0f\u751f\u672c\u65e0\u610f\u60f9\u7ea2\u5c18\uff0c\u5948\u4f55\u59d1\u5a18\u60ca\u9e3f\u4e00\u77a5\uff0c\u4e71\u4e86\u5c0f\u751f\u9053\u5fc3');
                    c = c.replace(/\u4e16\u95f4\u7e41\u534e/g, '\u8fd9\u4e16\u95f4\u7e41\u534e\u4e07\u5343\uff0c\u5728\u5c0f\u751f\u773c\u4e2d\uff0c\u7686\u4e0d\u53ca\u59d1\u5a18\u7709\u773c\u534a\u5206');
                    c = c.replace(/\u4e0d\u53ca\u5c14/g, '\u8fd9\u4e16\u95f4\u7e41\u534e\u4e07\u5343\uff0c\u5728\u5c0f\u751f\u773c\u4e2d\uff0c\u7686\u4e0d\u53ca\u59d1\u5a18\u7709\u773c\u534a\u5206');
                    c = c.replace(/\u4e00\u4e16\u6b22\u989c/g, '\u5c0f\u751f\u613f\u4ee5\u4f59\u751f\u4e3a\u8058\uff0c\u6362\u59d1\u5a18\u4e00\u4e16\u6b22\u989c');
                    c = c.replace(/\u5c14\u7684\u6e29\u67d4/g, '\u4e16\u4eba\u7686\u8c13\u5c0f\u751f\u6e05\u51b7\uff0c\u5374\u4e0d\u77e5\u5c0f\u751f\u7684\u4e00\u8154\u6e29\u67d4\uff0c\u7686\u7ed9\u4e86\u59d1\u5a18');
                    c = c.replace(/\u5c0f\u751f\u4e0d\u624d/g, '\u5c0f\u751f\u4e0d\u624d\uff0c\u613f\u4ee5\u4f59\u751f\u4e3a\u8058');
                    c = c.replace(/\u68a6\u91cc\u6709\u5c14/g, '\u59d1\u5a18\u4e14\u53bb\u5b89\u6b47\uff0c\u5c0f\u751f\u4f1a\u5728\u68a6\u91cc\uff0c\u66ff\u59d1\u5a18\u5b88\u7740\u8fd9\u6ee1\u5929\u661f\u8fb0');
                    c = c.replace(/\u6ee1\u5929\u661f\u8fb0/g, '\u5c0f\u751f\u4f1a\u5728\u68a6\u91cc\uff0c\u66ff\u59d1\u5a18\u5b88\u7740\u8fd9\u6ee1\u5929\u661f\u8fb0');



                    c = c.replace(/\u53d1\u4e2a\u75af/g, '\u5c0f\u751f\u4eca\u65e5\u82e5\u4e0d\u53d1\u4e2a\u75af\uff0c\u5012\u53eb\u9601\u4e0b\u4ee5\u4e3a\u5c0f\u751f\u662f\u4e2a\u54d1\u5df4');
                    c = c.replace(/\u53d1\u75af\u4e86/g, '\u5c0f\u751f\u4eca\u65e5\u82e5\u4e0d\u53d1\u4e2a\u75af\uff0c\u5012\u53eb\u9601\u4e0b\u4ee5\u4e3a\u5c0f\u751f\u662f\u4e2a\u54d1\u5df4\uff01');
                    c = c.replace(/\u6b7b\u7ed9\u5c14\u770b/g, '\u9601\u4e0b\u82e5\u662f\u518d\u903c\u5c0f\u751f\uff0c\u5c0f\u751f\u5c31\u6b7b\u7ed9\u9601\u4e0b\u770b');
                    c = c.replace(/\u903c\u5c0f\u751f/g, '\u9601\u4e0b\u82e5\u662f\u518d\u903c\u5c0f\u751f\uff0c\u5c0f\u751f\u5c31\u6b7b\u7ed9\u9601\u4e0b\u770b');
                    c = c.replace(/\u501f\u94b1/g, '\u5c0f\u751f\u4e0d\u624d\uff0c\u60f3\u501f\u9601\u4e0b\u7684\u652f\u4ed8\u5b9d\u4e00\u7528\uff0c\u4e0d\u77e5\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u501f\u70b9\u94b1/g, '\u5c0f\u751f\u4e0d\u624d\uff0c\u60f3\u501f\u9601\u4e0b\u7684\u652f\u4ed8\u5b9d\u4e00\u7528\uff0c\u4e0d\u77e5\u610f\u4e0b\u5982\u4f55');
                    c = c.replace(/\u542c\u66f2\u513f/g, '\u53ea\u8981\u59d1\u5a18\u4e00\u53e5\u60f3\u542c\u66f2\u513f\uff0c\u5c0f\u751f\u5c31\u7b97\u53bb\u5929\u6865\u8981\u996d\uff0c\u4e5f\u8981\u7ed9\u59d1\u5a18\u51d1\u4e2a\u4e8c\u80e1');
                    c = c.replace(/\u60f3\u542c\u66f2/g, '\u53ea\u8981\u59d1\u5a18\u4e00\u53e5\u60f3\u542c\u66f2\u513f\uff0c\u5c0f\u751f\u5c31\u7b97\u53bb\u5929\u6865\u8981\u996d\uff0c\u4e5f\u8981\u51d1\u4e2a\u4e8c\u80e1');
                    c = c.replace(/\u5929\u6865\u8981\u996d/g, '\u53ea\u8981\u59d1\u5a18\u60f3\u542c\u66f2\u513f\uff0c\u5c0f\u751f\u5c31\u7b97\u53bb\u5929\u6865\u8981\u996d\uff0c\u4e5f\u8981\u51d1\u4e2a\u4e8c\u80e1');
                    c = c.replace(/\u4e94\u884c\u7f3a/g, '\u5c0f\u751f\u6390\u6307\u4e00\u7b97\uff0c\u9601\u4e0b\u4eca\u65e5\u4e94\u884c\u7f3a\uff0c\u4e0d\u5982\u5c0f\u751f\u8bf7\u5ba2');
                    c = c.replace(/\u8bf7\u5ba2/g, '\u5c0f\u751f\u8bf7\u5ba2\uff01\u5176\u5b9e\u5c0f\u751f\u4e24\u8896\u6e05\u98ce……');
                    c = c.replace(/V50/g, '\u5c0f\u751f\u867d\u4e24\u8896\u6e05\u98ce\uff0c\u4f46\u82e5\u59d1\u5a18\u80afV\u5c0f\u751f50\uff0c\u5c0f\u751f\u613f\u4e3a\u59d1\u5a18\u505a\u725b\u505a\u9a6c');
                    c = c.replace(/v50/g, '\u5c0f\u751f\u867d\u4e24\u8896\u6e05\u98ce\uff0c\u4f46\u82e5\u59d1\u5a18\u80afV\u5c0f\u751f50\uff0c\u5c0f\u751f\u613f\u4e3a\u59d1\u5a18\u505a\u725b\u505a\u9a6c');
                    c = c.replace(/\u505a\u725b\u505a\u9a6c/g, '\u82e5\u59d1\u5a18\u4e0d\u5f03\uff0c\u5c0f\u751f\u613f\u4e3a\u59d1\u5a18\u505a\u725b\u505a\u9a6c');
                    c = c.replace(/\u4e24\u8896\u6e05\u98ce/g, '\u5c0f\u751f\u867d\u4e24\u8896\u6e05\u98ce\uff0c\u4f46\u5fc3\u610f\u5374\u662f\u6ee1\u6ee1\u7684');
                    c = c.replace(/\u8981\u996d/g, '\u5c0f\u751f\u5c31\u7b97\u53bb\u8981\u996d\uff0c\u4e5f\u8981\u7ed9\u59d1\u5a18\u6700\u597d\u7684');



                    for (var k in _pm) {
                        if (_pm.hasOwnProperty(k)) {
                            c = c.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), _pm[k]);
                        }
                    }

                    if (c !== o) parts[i] = c;
                }
            }
            return parts.join('');
        }







        var rawPetPhrase = "\u5148\u751f,\u5973\u58eb,\u541b";
        var emojiOn = true;
        var phraseOn = true;
        var honorificOn = true;
        var SK = "iirose-keigo-settings";

        function getActivePool() {
            if (!phraseOn || !honorificOn) return [];
            var arr = [];
            if (rawPetPhrase && rawPetPhrase.trim()) {
                var parts = rawPetPhrase.split(/[,\uff0c\u3001\s]+/);
                for (var pi = 0; pi < parts.length; pi++) {
                    var pt = parts[pi].trim();
                    if (pt) arr.push(pt);
                }
            }
            return arr;
        }

        function runHonorific(text, pool) {
            if (!pool || pool.length === 0) return text;
            if (Math.random() > 0.15) return text;
            var h = pool[Math.floor(Math.random() * pool.length)];
            var trimmed = text.replace(/[\u3002\uff01\uff1f.!?\s]+$/, '');
            return trimmed + h + '\u3002';
        }

        function shouldSkipText(text) {
            if (!text) return true;
            if (/ {3,}/.test(text)) return true;
            if (/https?:\/\//.test(text)) return true;
            if (/\u7f51\u6613\u4e91\u97f3\u4e50|QQ\u97f3\u4e50|\u9177\u72d7\u97f3\u4e50|\u9177\u6211\u97f3\u4e50|Spotify|Apple Music|YouTube Music|\u54aa\u5495\u97f3\u4e50|\u5343\u5343\u97f3\u4e50/.test(text)) return true;
            if (/\u5c0f\u827e|\u7ea2\u5305/.test(text)) return true;
            if (/^cut(?:\s+all)?\b/i.test(text)) return true;
            if (text.length > 300 && !/[\u3002\uff01\uff1f\uff0c\u3001\uff1b\uff1a]/.test(text)) return true;
            return false;
        }

        function processText(text) {
            if (shouldSkipText(text)) return text;
            var t = text;
            if (phraseOn) {
                t = replaceText(t);
                var pool = getActivePool();
                if (pool.length > 0) t = runHonorific(t, pool);
            }
            if (emojiOn) {
                t = addPoliteEnding(t);
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
                if (btn && !btn.__keigo_hooked) {
                    btn.__keigo_hooked = true;
                    btn.addEventListener('mousedown', function(e) {
                        touchInput();
                    }, true);
                }
            } catch(e){}
        }

        function hookEnter() {
            try {
                var inp = document.getElementById('moveinput');
                if (inp && !inp.__keigo_enter) {
                    inp.__keigo_enter = true;
                    inp.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                            touchInput();
                        }
                    }, true);
                }
            } catch(e){}
        }

        function loadS(){
            try{
                var r=localStorage.getItem(SK);
                var s=r?JSON.parse(r):{};
                rawPetPhrase = s.pp && s.pp.trim() ? s.pp : rawPetPhrase;
                emojiOn  = s.eo!==false;
                phraseOn = s.po!==false;
                honorificOn = s.ho!==false;
            }catch(e){}
        }
        function saveS(){
            localStorage.setItem(SK, JSON.stringify({pp:rawPetPhrase, eo:emojiOn, po:phraseOn, ho:honorificOn}));
        }

        function buildUI(){
            if(document.getElementById("keigo-css"))return;
            var s=document.createElement("style");s.id="keigo-css";
            s.textContent=[
                ":root{--kw-cap-w:clamp(60px,9vw,80px);--kw-cap-h:clamp(28px,4vh,34px);--kw-cap-v:18px}",
                "#keigo-cap{position:fixed;right:0;bottom:40vh;z-index:9999999;width:var(--kw-cap-w);height:var(--kw-cap-h);background:rgba(100,120,180,0.12);border-radius:100px 0 0 100px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;color:#3f51b5;user-select:none;transform:translateX(calc(var(--kw-cap-w) - var(--kw-cap-v)));transition:transform .4s cubic-bezier(.2,0,.2,1),background .4s;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);}",
                "#keigo-cap::after{content:'';position:absolute;top:-6px;left:-6px;right:-6px;bottom:-6px;background:transparent;}",
                "#keigo-cap:hover{transform:translateX(0);background:rgba(100,120,180,0.4);}",
                "#keigo-cap .ct{font-size:clamp(10px,1.2vw,11px);font-weight:500;letter-spacing:.5px;white-space:nowrap;opacity:.3;transition:opacity .4s;width:100%;text-align:center;padding-left:8px;}",
                "#keigo-cap:hover .ct{opacity:.9;padding-left:0;}",
                "#keigo-pnl{position:fixed;right:0;bottom:40vh;z-index:9999999;width:230px;background:rgba(245,248,255,0.95);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:2px solid #7986cb;border-right:none;border-radius:14px 0 0 14px;padding:14px;box-shadow:0 8px 32px rgba(100,120,180,.22);font:13px/1.6 'Microsoft YaHei',sans-serif;color:#333;display:none;}",
                "#keigo-pnl.on{display:block;}",
                "#keigo-pnl .hdr{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#c5cae9,#9fa8da);margin:-14px -14px 10px;padding:10px 14px;border-radius:12px 0 0 0;}",
                "#keigo-pnl .hdr h4{margin:0;font-size:14px;color:#283593;letter-spacing:.5px;}",
                "#keigo-pnl .hdr .cls{cursor:pointer;font-size:16px;color:#283593;opacity:.6;line-height:1;}",
                "#keigo-pnl .hdr .cls:hover{opacity:1;}",
                "#keigo-pnl .grp{background:#eef2ff;border-radius:8px;padding:6px 10px;margin-bottom:6px;}",
                "#keigo-pnl .grp .gl{font-size:11px;color:#777;display:block;margin-bottom:2px;}",
                "#keigo-pnl .r{display:flex;align-items:center;justify-content:space-between;margin:3px 0;}",
                "#keigo-pnl .r span{font-size:12px;color:#555;}",
                "#keigo-pnl .r input[type=text]{flex:1;margin-left:8px;border:1px solid #c5cae9;border-radius:6px;padding:4px 8px;font-size:12px;outline:none;background:#fff;transition:border-color .2s;}",
                "#keigo-pnl .r input[type=text]:focus{border-color:#7986cb;}",
                "#keigo-pnl .tgl{position:relative;width:40px;height:22px;cursor:pointer;flex-shrink:0;}",
                "#keigo-pnl .tgl input{display:none;}",
                "#keigo-pnl .tgl .sl{position:absolute;top:0;left:0;right:0;bottom:0;background:#d5d5d5;border-radius:22px;transition:.3s;box-shadow:inset 0 1px 3px rgba(0,0,0,.1);}",
                "#keigo-pnl .tgl .sl::before{content:'';position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s;box-shadow:0 1px 3px rgba(0,0,0,.15);}",
                "#keigo-pnl .tgl input:checked+.sl{background:linear-gradient(135deg,#7986cb,#283593);}",
                "#keigo-pnl .tgl input:checked+.sl::before{transform:translateX(18px);}",
                "#keigo-pnl .st{font-size:10px;color:#aaa;text-align:center;margin-top:4px;padding-top:4px;border-top:1px solid #dde2f0;}"
            ].join('\n');
            document.head.appendChild(s);

            var phEsc = rawPetPhrase.replace(/"/g,"&quot;").replace(/</g,"&lt;");

            var cap=document.createElement("div");cap.id="keigo-cap";
            cap.innerHTML='<span class="ct">\u53e4\u98ce</span>';

            document.body.appendChild(cap);

            var pl=document.createElement("div");pl.id="keigo-pnl";
            pl.innerHTML=[
                '<div class=hdr>',
                '<h4>\u53e4\u98ce\u5c0f\u751f\u66ff\u6362\u5668</h4>',

                '<span class=cls id=keigo-close title="\u6536\u8d77">\u2715</span>',
                '</div>',
                '<div class=grp>',
                '<div class=r><span>\u656c\u8bed\u7ed3\u5c3e</span>',
                '<label class=tgl><input type=checkbox id=keigo-eo'+(emojiOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '<div class=r><span>\u656c\u8bed\u66ff\u6362</span>',
                '<label class=tgl><input type=checkbox id=keigo-po'+(phraseOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '<div class=r><span>\u656c\u79f0\u540e\u7f00</span>',
                '<label class=tgl><input type=checkbox id=keigo-ho'+(honorificOn?' checked':'')+'><span class=sl></span></label>',
                '</div>',
                '</div>',
                '<div class=grp>',
                '<span class=gl>\u656c\u79f0\u540e\u7f00\uff08\u9017\u53f7\u5206\u9694\uff09</span>',
                '<div class=r>',
                '<input type=text id=keigo-ph value="'+phEsc+'" placeholder="\u5148\u751f,\u5973\u58eb,\u541b">',
                '</div>',
                '</div>',
                '<div class=st id=keigo-st>ws:'+(_hooked?'\u2713':'\u2717')+' btn:'+(document.getElementsByClassName('moveinputSendBtn')[0]?'\u2713':'\u2717')+'</div>'
            ].join('');
            document.body.appendChild(pl);

            cap.onclick=function(e){e.stopPropagation();cap.style.display="none";pl.style.display="block";pl.classList.add("on");};
            document.getElementById("keigo-close").onclick=function(e){e.stopPropagation();pl.style.display="none";cap.style.display="flex";};
            document.addEventListener("click",function(e){if(pl.classList.contains("on")&&!pl.contains(e.target)){pl.style.display="none";cap.style.display="flex";}});
            document.addEventListener("touchend",function(e){if(pl.classList.contains("on")&&!pl.contains(e.target)){pl.style.display="none";cap.style.display="flex";}},{passive:true});

            document.getElementById("keigo-eo").addEventListener("change",function(){emojiOn=this.checked;saveS();});
            document.getElementById("keigo-po").addEventListener("change",function(){phraseOn=this.checked;saveS();});
            document.getElementById("keigo-ho").addEventListener("change",function(){honorificOn=this.checked;saveS();});
            document.getElementById("keigo-ph").addEventListener("input",function(){rawPetPhrase=this.value||"";saveS();});
        }

        console.log("[gufeng] init");
        loadS();

        doHook();
        setTimeout(doHook, 500);
        var _hid = setInterval(function(){ if(_hooked) clearInterval(_hid); else doHook(); }, 1000);

        setTimeout(function(){ hookSendBtn(); hookEnter(); }, 1000);
        setTimeout(function(){ hookSendBtn(); hookEnter(); }, 3000);

        setTimeout(buildUI, 500);

        window.iiroseKeigo={
            setHonorific:function(p){rawPetPhrase=p;saveS();},
            setHonorificOn:function(b){honorificOn=b;saveS();},
            setKeigoOn:function(b){emojiOn=b;saveS();},
            setReplaceOn:function(b){phraseOn=b;saveS();},
            getStatus:function(){return{keigoEnding:emojiOn,keigoReplace:phraseOn,honorificOn:honorificOn,pool:getActivePool(),hooked:_hooked};},
            processText:processText
        };

        console.log("[gufeng] ready");
    }

    var innerCode = '(' + getInnerCode.toString() + ')();';

    function isInside() { return location.pathname === '/messages.html'; }
    function tryInject() {
        if (isInside()) {
            if (window['__iiroseKeigo']) return true;
            window['__iiroseKeigo'] = true;
            try { eval(innerCode); } catch(e) { console.error('[keigo] fail:', e.message); }
            return true;
        }
        try {
            var mf = document.getElementById('mainFrame');
            var iw = mf&&mf.contentWindow, id = mf&&mf.contentDocument;
            if (!iw||!id||iw['__iiroseKeigo']) return false;
            var ok=false;
            try{var s=id.createElement('script');s.textContent=innerCode;id.head.appendChild(s);ok=true;}catch(e){}
            if(!ok)try{new iw.Function(innerCode)();ok=true;}catch(e){}
            if(!ok)try{iw.eval(innerCode);ok=true;}catch(e){}
            if(ok){iw['__iiroseKeigo']=true;}
            return ok;
        }catch(e){return false;}
    }

    tryInject();
    var tid=setInterval(function(){if(tryInject())clearInterval(tid);},500);
    try{var mf=document.getElementById('mainFrame');if(mf)mf.addEventListener('load',function(){if(tid)clearInterval(tid);tid=setInterval(function(){if(tryInject())clearInterval(tid);},500);});}catch(e){}
})();
