import { Client } from 'discord.js';
import { random } from '../resources/functions/.export.functions';


export default (client: Client) => {
    client.on('messageCreate', (message) => {
        try {
            if (!message.guild || !message.member) return;
            if (!message.member.user) return;
            if (message.member.user.bot) return;
        } catch (err) {
            return;
        };

        switch (message.content.toLowerCase()) {
            case 'emm':
                message.channel.send('<@859327109679546418> 好色喔');
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/971384893789577276/d5edb8685a75df03.jpg');
                break;

            case '爛':
                message.channel.send('<@859327109679546418> 好爛');
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/971386219957211136/ffecd986f2dbc1f4.webp');
                break;

            case '早安':
                message.channel.send(`早安~ ${message.author}`);
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/875181934802792459/sticker_9.png');
                break;

            case '午安':
                message.channel.send(`加油 ${message.author} ，剩下半天了!`);
                break;

            case '晚安':
                message.channel.send(`晚安~ ${message.author}`);
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/875195042908753920/sticker_83.png');
                break;

            case '老婆':
                message.reply('你沒有老婆!!');
                break;

            case 'trash':
                message.reply('你才是 ! ! !');
                break;

            case '我就爛':
                message.reply(`${message.author.username}好爛`);
                break;

            case 'www':
                message.reply('呵呵笑死');
                break;

            case '酷欸':
                message.reply('庫誒');
                break;

            case '景頁':
                message.reply('堅果好吃!!!\n!!!\n!!!\n!!!')
                message.channel.send('https://cdn.discordapp.com/attachments/935877261679284294/958332622252167208/images.png');
                break;

            case '酷欸':
                message.reply('肉包好ㄘ 讚啦😃');
                break;

            case '讚啦':
                message.reply('無情單殺 無情雙殺 哭啊');
                break;

            case '關於堅果':
                message.reply({
                    content: '<@750203298623127623>\n堅果是植物的一類果實，通常用來泛指果皮堅硬的乾果類，依植物學的定義，堅果是指由堅硬的果皮和種子組成的果實，且在果實成熟時果皮不開裂（閉果）。但在日常的定義下，只要有堅硬外殼、油性的果仁就會稱為堅果。\n而景頁髮型紙者，經「堅果神」洗禮，為堅果之狀，故有此名',
                    embeds: [{
                        fields: [
                            {
                                name: ('關於堅果'),
                                value: (`https://www.youtube.com/watch?v=71FyXRPzHSA`),
                                inline: true
                            }
                        ]
                    }]
                });
                break;

            case '關於肉包':
                message.reply('<@773527274875125790>  好綠喔');
                break;

            case '夜吾':
                message.reply('the拳擊大師\n(但被打到瘀青)\nhttps://www.youtube.com/watch?v=mg2ihH1dkCk');
                break;

            case '哭阿':
                message.reply('QQ');
                break;

            case '倉鼠':
                message.reply('<@790952772865359892> 可愛的意翔!!!');
                break;

            case 'owo':
                message.reply('owo');
                break;

            case '<>':
                message.reply('ouo');
                break;

            case 'hi':
                message.channel.send('Hello,' + `${message.author}` + '，今天心情如何呀?');
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/875182203322122250/sticker_26.png');
                break;
        };

        switch (true) {
            case message.content.includes('你好瑟喔'):
                if (random(3) == 0) {
                    message.channel.send('<@859327109679546418> 不可以瑟瑟');
                }
                else {
                    message.channel.send('<@750203298623127623> 不可以瑟瑟');
                };
                break;

            case message.content.startsWith('嘿'):
                message.delete();
                if (message.content.length > 1) {
                    let users: string[] = [];
                    message.mentions.users.each(user => {
                        users.push(`<@${user.id}>`);
                    });
                    message.channel.send(`嘿 ${users.join('')}`);
                }
                else {
                    if (random(2) == 0) {
                        message.channel.send('嘿 <@859327109679546418>');
                    }
                    else {
                        message.channel.send('嘿 <@750203298623127623>');
                    };
                };
                break;

            case message.content.includes('掰'):
                message.channel.send('https://cdn.discordapp.com/attachments/874654634533343232/875270242031517726/sticker--.png');
                break;

            case message.content.includes('酒'):
                message.channel.send(`${message.author}你又喝酒了?\n\n溫馨提醒 : 飲酒過量，有害健康。酒後不開 Discord，安全有保障。\n喔還有，"喝 Discord 不用酒，用酒不喝 Discord。" 嗝~(醉倒)`);
                break;
        };

        if (message.content.startsWith('卡片 ')) {
            var friendzone = message.content.toString();
            message.delete();
            var friend = friendzone.slice(-(friendzone.length - 3));
            message.channel.send(`${friend}我很抱歉，但${message.author}似乎給你發了一張卡片`);
            switch (random(3)) {
                case 0:
                    message.channel.send(`https://cdn.discordapp.com/attachments/874654634533343232/874657393357750312/1.jpg`);
                    break;
                case 1:
                    message.channel.send(`https://cdn.discordapp.com/attachments/874654634533343232/874657429634285598/2.png`);
                    break;
                case 2:
                    message.channel.send(`https://cdn.discordapp.com/attachments/874654634533343232/874657464560275626/070334418cadc60c.png`);
                    if (random(5) == 3) {
                        message.channel.send('我要先去洗個澡\n     `C.H.N [2021.08.10 16:44]`')
                    };
                    break;
            };
        };
    });
};

export const config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: "reacttext",

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: "null"
};