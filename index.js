const { Client } = require('whatsapp-web.js')
const client = new Client({ puppeteer: {headless: false}})
const questions = require('./questions.json')

client.initialize()

client.on('qr', (qr) => {
	console.log("QR Received", qr)
})

client.on('ready', () => {
	console.log("Client Ready!")	
})

client.on('message_create', msg => {

	let chat = msg.getChat()

	// if(chat.isGroup){

		console.log("Message Received", msg)

		if(msg.body == '!ping'){
			msg.reply('pong')
		}

		if(msg.body == '!question'){
			const keys = Object.keys(questions)
			const randIndex = Math.floor(Math.random() * keys.length)
			const randKey = keys[randIndex]

			msg.reply(questions[randKey]["Question"])
			msg.reply(`To get the answer send '!answer ${randKey}'`)
		}

		if(msg.body.startsWith('!question ')){
			const index = msg.body.slice(10)
			msg.reply(questions[index]["Question"])
		}

		if(msg.body.startsWith('!answer ')){
			const index = msg.body.slice(8)
			msg.reply(questions[index]["Answer"])
		}
	// }

})

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

// Example
// Message Received Message {
// 	mediaKey: undefined,
// 	id: {
// 	  fromMe: false,
// 	  remote: '918697370810-1535442813@g.us',
// 	  id: 'BE19C34143EB30905883FF075D7D826A',
// 	  _serialized: 'false_918697370810-1535442813@g.us_BE19C34143EB30905883FF075D7D826A'
// 	},
// 	ack: -1,
// 	hasMedia: false,
// 	body: 'Aj sab Khush hai',
// 	type: 'chat',
// 	timestamp: 1603219124,
// 	from: '918697370810-1535442813@g.us',
// 	to: '918584907916@c.us',
// 	author: '919883050292@c.us',
// 	isForwarded: false,
// 	broadcast: false,
// 	fromMe: false,
// 	hasQuotedMsg: false,
// 	location: undefined,
// 	mentionedIds: []
// }


