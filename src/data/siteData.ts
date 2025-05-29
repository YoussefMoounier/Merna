export const photos = [
  {
    src: '/proud.jpg',
    alt: 'اشطر كتكوتة',
    description: 'اشطر كتكوتة في حياتي كانت بتتكرم'
  },
  {
    src: '/looking.jpg',
    alt: 'ذكرى الخطوبة',
    description: 'تاني عيد سوا بصورتك الي خطفاني لحد دلوقتي'
  },
  // Add more photos here
]

export const locations = [
  {
    id: 1,
    name: 'مكان أول موعد',
    coordinates: [31.2357, 30.0444] as [number, number], // إحداثيات القاهرة
    description: 'مكان أول موعد لنا',
    date: '1 يناير 2024'
  },
  {
    id: 2,
    name: 'المطعم المفضل',
    coordinates: [31.2357, 30.0444] as [number, number],
    description: 'المطعم المفضل لنا',
    date: '14 فبراير 2024'
  },
  // Add more locations here
]

export const wishes = [
  {
    id: 1,
    title: 'Diamond Necklace',
    description: 'A beautiful diamond necklace to match your eyes',
    price: 1000,
    image: '/images/gift1.jpg',
    reserved: false
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    description: 'A romantic weekend at a luxury resort',
    price: 500,
    image: '/images/gift2.jpg',
    reserved: false
  },
  // Add more wishes here
]

export const stars = [
  {
    id: 1,
    name: 'أول محادثة',
    description: 'أول مرة كلمنا بعض على السوشيال ميديا، كنت متوتر جامد!',
    date: '1 يناير 2024',
    coordinates: [20, 30] as [number, number],
    image: '/first time.jpg'

  },
  {
    id: 2,
    name: 'أول لقاء',
    description: 'أول مرة شفنا بعض في الحقيقة، كنت متحمس أوي!',
    date: '15 يناير 2024',
    coordinates: [40, 50] as [number, number],
    image: '/images/meeting1.jpg'
  },
  {
    id: 3,
    name: 'أول موعد',
    description: 'أول موعد رسمي لنا، قضينا وقت حلو مع بعض!',
    date: '1 فبراير 2024',
    coordinates: [60, 40] as [number, number],
    image: '/images/date1.jpg'
  },
  {
    id: 4,
    name: 'عيد الحب',
    description: 'أول عيد حب لنا مع بعض، هديتك كانت خاصة!',
    date: '14 فبراير 2024',
    coordinates: [80, 60] as [number, number],
    image: '/images/valentine.jpg'
  }
]

export const memories = [
  {
    id: 1,
    date: 'يناير 20/ 2021',
    title: 'اول مرة كلمتيني خاص',
    description: 'اول مرة كلمتيني خاص وساعتها قلبي دق وقولت وه مين دي',
    type: 'chat' as const,
    chatImage: '/first time.jpg'
  },
  {
    id: 2,
    title: 'اول مرة اسرح في جمال حد',
    description: 'كنت لسه مقبول علي الانستا وسرحت قدام صورتك الي كنتي حطاها بروفايل وفضلت سرحان فيها برضو ',
    type: 'meeting' as const,
    image: '/beut.jpg'
  },
  {
    id: 3,
    title: 'كنت قاصد',
    description: 'كان بيبقي قصدي ارخم عليكي في الجروب واطلعك علشان نتكلم خاص :)',
    type: 'date' as const,
    image: 'r5ama.jpg'
  },
  {
    id: 4,
    title: 'وبعدين بقي',
    description: 'وبعدين بقي تاني مرة اسرح فيكي بلا هدف ',
    type: 'special' as const,
    image: '/beut2.jpg',
  },
  {
    id: 5,
    title: 'واخيراً',
    description: 'واخيراً حققت هدف من اهدافي الي كانت من بدري اوي وهي اني اشوفك ونتصور كمان ',
    type: 'special' as const,
    image: '/meet.jpg',
  }
]

export const secretMessages = [
  {
    id: 1,
    title: 'كوتي كوتي',
    content: 'اول لما سلمت عليكي ايدك كانت كوتي كوتي اوي :)',
    hint: 'اتقابلنا يوم كام',
    password: '30',
    unlocked: false
  },
  {
    id: 2,
    title: 'سناب',
    content: 'اول مرة بعتيلي ستريك وشوفت فيديو الي بتغمزي فيه انهارت من القلوب :)',
    hint: 'اكتر كلمة بحب اسمعها منك',
    password: 'بحبك',
    unlocked: false
  },
  // Add more messages here
]

export const questions = [
  {
    id: 1,
    question: 'لوني المفضل إيه؟',
    options: ['اصفر', 'بينك', 'اسود', 'أخضر'],
    correctAnswer: 2,
    points: 10
  },
  {
    id: 2,
    question: 'بحب اكل ايه ',
    options: ['فاصوليا', 'كشري', 'بامية', 'مشويات'],
    correctAnswer: 1,
    points: 15
  },
  {
    id: 3,
    question: 'ايه اكتر حاجة بحبها',
    options: ['انط من الشباك', 'اجري في المكان', 'اتخانق', 'ابوس انا'],
    correctAnswer: 3,
    points: 10
  },
  // Add more questions here
]

export const promises = [
  {
    id: 1,
    text: "وعد مني اني افضل احبك بنفس مقدار الحب للابد ",
  },
  {
    id: 2,
    text: "هفضل دايماً جنبك في الوحش قبل الحلو ",
  },
  {
    id: 3,
    text: "مش هخليكي تنامي زعلانه في يوم ولو حصل يبقي الفضائيين خطفوني واستبدلوني",
  },
  {
    id: 4,
    text: "هخليكي فرحانه طول الوقت لان طبيعي مفيش احسن من ضحكتك في الدنيا",
  },
  {
    id: 5,
    text: "اني احضنك كل يوم و كل نص ساعه بالتحديد :)",
  },
] 