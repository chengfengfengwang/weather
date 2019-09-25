var Fontmin = require('fontmin');

var smBoldText = `
0123456789
P2-f 一共有 人 在AI音乐学院开启了他们的智能学琴之路    
P3-f 2018年，我们在全球48个国家 都发现了学员的足迹 来自人口仅有37万的中美洲小国——伯利兹 非洲第一岛国——马达加斯加 甚至是充满中东风情的伊拉克...
P5-f  这些明星省份的同学 也很有音乐细胞 在城市的霓虹下，还有音乐相伴，甚好 江苏 山东 浙江 四川 河南
P6-f 很多人都已经进入了梦乡可还是有超过. 的学员按响琴弦
P8-f   这些难题你是否觉得似曾相识？ 的尤克里里学员认为和弦很难  的吉他学员认为和弦、和弦组成最让人头疼
P9-f 2018年9月25日上线近百名同学上传了自己的作品.  同学的最受大家的喜欢有人为他点赞
P10-f 这一年, AI音乐学院上新了 个乐器品类 
P11-f 我们依然不忘初心，用最优质的服务 带给所有人最好的学习体验， 让所有人学会用音乐去表达！`;
var fontmin = new Fontmin()
  
fontmin.src('./originFont/SourceHanSerifCN-SemiBold.ttf')
    .use(Fontmin.glyph({
        text: smBoldText,
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .dest('src/assets/font');
fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    //console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});

