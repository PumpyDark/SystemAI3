const TelegramBot = require('node-telegram-bot-api');

// Ganti 'TOKEN_BOT_ANDA' dengan token bot Telegram yang valid
const bot = new TelegramBot('6132847045:AAFfUUkE8kEw1UqRzce84TZPFeTZT5h9tvw', { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const userId = msg.from.id;
  const username = msg.from.username || '';
  const firstName = msg.from.first_name || '';
  const lastName = msg.from.last_name || '';

  // Mendapatkan waktu saat ini
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleString();

  // Menampilkan ID pengguna, username, tanggal, dan jam di konsol
  console.log('ID Pengguna:', userId);
  console.log('Username:', username);
  console.log('Nama Depan:', firstName);
  console.log('Nama Belakang:', lastName);
  console.log('Tanggal & Jam:', formattedTime);
  console.log('Pesan Pengguna:', messageText);

  // Tambahkan logika atau perintah yang sesuai di sini
  // Contoh: Balas pesan dengan pesan yang sama
  bot.sendMessage(chatId, `${messageText}`);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Menampilkan menu owner dengan tombol dan emoji
  const ownerMenu = [
    [
      {
        text: 'YouTube \u{1F3A5}',
        url: 'https://youtube.com/@Kz.tutorial'
      },
      {
        text: 'WhatsApp \u{1F4AC}',
        url: 'https://wa.me/6289502821173'
      }
    ],
    [
      {
        text: 'Instagram \u{1F4F8}',
        url: 'https://instagram.com/kz.tutorial97'
      }
    ]
  ];

  const ownerMarkup = {
    inline_keyboard: ownerMenu
  };

  // Menampilkan menu banding dengan submenu
  const bandingSubMenu = [
    [
      {
        text: 'Informasi Termux',
        callback_data: 'informasi_termux'
      }
    ]
  ];

  const bandingMenu = [
    [
      {
        text: 'Informasi Termux \u{1F4BB}',
        callback_data: 'informasi_termux',
        submenu: bandingSubMenu
      }
    ]
  ];

  const bandingMarkup = {
    inline_keyboard: bandingMenu
  };

  // Menampilkan menu download script
  const downloadScriptMenu = [
    [
      {
        text: 'Download Script',
        callback_data: 'download_script'
      }
    ]
  ];

  const downloadScriptMarkup = {
    inline_keyboard: downloadScriptMenu
  };

  // Menampilkan menu hapus percakapan
  const hapusPercakapanMenu = [
    [
      {
        text: 'Tentang Termux \u{1F4BB}',
        callback_data: 'tentang_termux'
      }
    ]
  ];

  const hapusPercakapanMarkup = {
    inline_keyboard: hapusPercakapanMenu
  };

  // Mengirimkan pesan sambutan dan menu kepada pengguna
  bot.sendMessage(chatId, '🔎 Menu Pemilik/Owner', { reply_markup: ownerMarkup });
  bot.sendMessage(chatId, '🔎 Menu Informasi Termux', { reply_markup: bandingMarkup });
  bot.sendMessage(chatId, '🔎 Menu Download Secript', { reply_markup: downloadScriptMarkup });
  bot.sendMessage(chatId, '🔎 Menu Tentang Termux', { reply_markup: hapusPercakapanMarkup });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Menangani penekanan tombol banding
  if (data === 'informasi_termux') {
    bot.sendMessage(chatId, '📚 Informasi Termux 📚\n\n📱 Nama :Termux\n📅 Tanggal Rilis: 1 Juni 2015\n👨‍ Pembuat: Fredrik Fornwall\n🖥️  Bahasa Pemrograman: Java dan C\n📱 Support Android: Android 5.0 (Lollipop) atau yang lebih baru\n🌍 Asal: Swedia\n🚀 Status: Aktif');
  } else if (data === 'tentang_termux') {
    bot.sendMessage(chatId, 'Tentang Termux:\n\nTermux adalah sebuah aplikasi terminal emulator dan lingkungan Linux untuk perangkat Android. Dengan menggunakan Termux, pengguna dapat menjalankan perintah-perintah shell, menginstall paket-paket Linux, serta menjalankan skrip dan program-program yang biasanya dijalankan di sistem operasi Linux. Termux sangat berguna bagi para pengembang, peneliti keamanan, dan pengguna yang ingin mengakses lingkungan Linux pada perangkat Android mereka.');
  } else if (data === 'download_script') {
    const downloadScriptSubMenu = [
      [
        {
          text: 'Script 1',
          url: 'https://example.com/script1.py'
        },
        {
          text: 'Script 2',
          url: 'https://example.com/script2.py'
        }
      ],
      [
        {
          text: 'Script 3',
          url: 'https://example.com/script3.py'
        },
        {
          text: 'Script 4',
          url: 'https://example.com/script4.py'
        }
      ],
      [
        {
          text: 'Script 5',
          url: 'https://example.com/script5.py'
        }
      ]
    ];

    const downloadScriptSubmenuMarkup = {
      inline_keyboard: downloadScriptSubMenu
    };

    bot.sendMessage(chatId, 'Silakan pilih script yang ingin Anda download:', { reply_markup: downloadScriptSubmenuMarkup });
  }
});

bot.on('polling_error', (error) => {
  console.log('Error:', error.code, error.message);
});
