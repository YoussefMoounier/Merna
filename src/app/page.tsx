'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PhotoGallery from '@/components/PhotoGallery'
import LoveMap from '@/components/LoveMap'
import SecretMessages from '@/components/SecretMessages'
import LoveGame from '@/components/LoveGame'
import SplashScreen from '@/components/SplashScreen'
import Promises from '@/components/Promises'
import BackgroundMusic from '@/components/BackgroundMusic'
import LoveEffect from '@/components/LoveEffect'
import FinalMessageSection from '@/components/FinalMessageSection'
import LoveSong from '@/components/LoveSong'
import LoveTimeline from '@/components/LoveTimeline'
import StarMap from '@/components/StarMap'
import { photos, locations, secretMessages, questions, promises, memories } from '@/data/siteData'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {!showSplash && <LoveEffect />}

      {/* Floating Elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`floating-${i}`}
          className="floating-element"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 2 + 1}rem`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {['✨', '💫', '🌟', '⭐', '💖'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* القسم الأول: الرسالة الترحيبية */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-pink-50">
        {/* خلفية متحركة */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`bg-heart-${i}`}
              className="absolute text-pink-400 opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 3 + 2}rem`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-pink-600 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              كل سنة وانتي طيبة
            </motion.h1>
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-600 mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              يا حبيبتي ❤️
            </motion.h2>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              فكراني هعدي يومك ده كدا بالساهل يعني تؤ تؤ .. عيب عليكي
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-pink-600 transition-colors"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
              >
                يلا بيييينا
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* مؤشر التمرير */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-8 h-8 text-pink-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      <div className="divider"></div>

      {/* القسم الثاني: خريطة النجوم */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-pink-600">خريطة نجوم حبنا</h2>
            <p className="text-xl text-gray-600">كل نجمة تمثل لحظة من لحظات سعادتنا</p>
          </motion.div>
          <StarMap 
            stars={[
              {
                id: 1,
                name: "قولتلك اني بحبك",
                description: "اليوم الي قولتلك فيه اني بحبك :)",
                date: "12/24/2024",
                coordinates: [20, 30],
              },
              {
                id: 2,
                name: "اول مرة شوفتك",
                description: "اول مرة شوفتك",
                date: "01/30/2025",
                coordinates: [40, 50],
              },
              {
                id: 3,
                name: "أول هدية",
                description: "في نفس اليوم الي شوفتك فيه جبتيلي فيه احلي هدية هتفضل معايا للابد",
                date: "01/30/2025",
                coordinates: [60, 40],
              },
              {
                id: 4,
                name: "أول هدية",
                description: "أول هدية تبادلناها",
                date: "1 فبراير 2024",
                coordinates: [60, 40],
                image: "/images/first-gift.jpg"
              },
            ]}
            finalMessage="طبعاً من وسط كل النجوم الي مشيتي فيها دي مفيش احلي وارق من نجمتي ملكة النجوم واحلاهم ❤️"
          />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم الثالث: خريطة المواقع */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-blue-600">خريطة حبنا</h2>
            <p className="text-xl text-gray-600">المكان ده جمعنا في يوم </p>
          </motion.div>
          <LoveMap locations={locations} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم الرابع: تايم لاين الذكريات */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            شوية ذكريات بحبها 
          </h2>
          <LoveTimeline memories={memories} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم الرابع: معرض الصور */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            حاجات حبيتها وافتخرت بيها
          </h2>
          <PhotoGallery photos={photos} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم الخامس: أغنية الحب */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            علي راي الفنان 
          </h2>
          <LoveSong />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم السادس: الرسائل السرية */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            حلي يباشا
          </h2>
          <SecretMessages messages={secretMessages} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم السابع: لعبة الحب */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            جاوبي يفنانه يلا
          </h2>
          <LoveGame questions={questions} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم الثامن: الوعود */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            شوية وعود هتفضل للابد
          </h2>
          <Promises promises={promises} />
        </div>
      </section>

      <div className="divider"></div>

      {/* القسم التاسع: الرسالة النهائية */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FinalMessageSection message="
        علي راي الفنان وهو بيقول من زمان نفسي اغنيلك واحكيلك قد ايه انا بحبك 
        كان نفسي اقولك كل الكلام الحلو من بدري اوي بس كنت ماسك نفسي يعني :) وبما ان فرصتي جت وده عيد ميلادك فا انا بحبك قد الكون كله وقد العالم كله
        ومهما اوصفلك حبي مش هيوصلك علشان انتي اكتر حد انا حبيته في الدنيا الاولي والاخيرة علي راي الفنانة التانية ايا يكن .. فكرة الموقع جتلي من فترة 
        ولانك مميزة عن باقي الناس ومميزة عن الكل فا لازم يبقي ليكي حاجة معاكي للابد تفتكريها وتجمع كل ذكرياتنا من الاول للاخر
        كل سنة وانتي نجمتي الي منورالي دنيتي ودايما مميزاني ومخلياني فخور ان في حد زيك بالطيبة والجمال ده كله معايا الكلام بكتبه وان سرحان في شكلك وصوتك وكل ملامحك ثابته في دماغي 
        احلي فنانتي في الدنيا ولما قولت فنانتي قولتها علشان بترسمي وتلوني حياتي بعد ما كانت ابيض واسود مكنش ليها معني ولا طعم 
        يعني الحمدلله فنانة ونجمة وكمان 7 بهارات علشان بتطعمي الحياة :)..
          حبيبتي وصحبتي وبنتي الكتكوتة الصغنونة متزعليش مني في يوم لو شديت عليكي او قسيت عليكي مكنش قصدي وولا هيبقي قصدي ومتزعليش برضو من غيرتي الزيادة بس ازاي يعني
          اخلي حد يقرب من الجمال ده كله 
          كل سنة وانتي طيبة ياحبيبتي ودايماً مع بعض ومحلية حياتي بحببككككككككك
          كفاية عليكي كدا علشان خلقك ضيق :)
        " />
        </div>
      </section>

      {/* Background Music */}
      <BackgroundMusic src="/0529.mp3" loop={true} />

      <AnimatePresence>
        {showSplash && (
          <SplashScreen onStart={handleSplashComplete} />
        )}
      </AnimatePresence>
    </main>
  )
}
