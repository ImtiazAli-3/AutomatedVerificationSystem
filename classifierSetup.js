const natural = require('natural');
const classifier = new natural.BayesClassifier();
//CREATED PRETRAINED classifier model. this is used to predict the category through a given description

function trainClassifier() {
    //clothing
    classifier.addDocument('Break all the fashion records with the Hyperfly × MHA × NBA Boston Celtics All Might Hoodie! This Limited Edition collaboration gets nothing but net, combining the essence of anime with Boston pride. Dont miss out on this unique mashup – score one for yourself today and elevate your hoodie game with a touch of heroism!', 'clothes');
    classifier.addDocument('Protect and festivate! Join the Scout Regiment in style with our exclusive Crunchyroll Attack on Titan Holiday Sweater. The sweater seamlessly blends Survey Corps spirit with holiday charm, with Kanji that says “Survey Corps” across the bottom and “Attack on Titan” on the top. Stay warm while fighting Titans and enjoying cocoa this holiday!', 'clothes');
    classifier.addDocument('Lounging never looked so regal. These Kikunojo kimono symbol fleece sweats turn your couch into a palace. Snuggle up in this comfy tribute to One Piece (and look good while doing it).', 'clothes');
    classifier.addDocument('Dress to impress with the Poster Hoodie, where the only thing “cursed” is how good you’ll look. Thanks to Marshmello x JUJUTSU KAISEN, style just got supernatural.', 'clothes');
    classifier.addDocument('Stretch your style to new heights with the Gum Gum Devil Fruit Sweater! Channel your inner Monkey D. Luffy and show the world youre incredibly flexible. Just dont get too carried away trying to reach that One Piece!', 'clothes');
    classifier.addDocument('Stand out in style this holiday season with our exclusive Crunchyroll JoJos Bizarre Adventure Guido Mista Holiday Sweater. This unique sweater features a playful design inspired by the world of Stands and Stand Users. And yes, wearing this sweater entitles you to do Stand poses in all of your holiday pictures.', 'clothes');
    classifier.addDocument('Ditch the poker face because this bunny plays her hand out loud. Slip on this cozy Bunny Ace crew sweatshirt to add a cool touch to your wardrobe. It’s a charming design that’s sure to leave a lasting impression.', 'clothes');
    classifier.addDocument('Experience a California Smash crossover with the Hyperfly × MHA × NBA Golden State Warriors All Might Hoodie! This Limited Edition hoodie is a triple-threat combo of style, basketball, and pure heroism. Join forces with the All-Star All Might from My Hero Academia and make a splash hit in the fashion game – grab your golden ticket to exclusive streetwear now!', 'clothes');
    classifier.addDocument('Embrace the spirit of the Hidden Leaf Village with this stylish and functional Hidden Leaf Forehead Protector Beanie. Whether battling the cold or channeling your inner ninja, this beanie is the perfect way to show your love for Naruto Shippuden. ', 'clothes');
    classifier.addDocument('You might not necessarily think of Trafalgar D. Water Law as a style icon, but these sweatpants are a subtle and cool way to add a splash of color and One Piece goodness to your wardrobe. Plus, they’re incredibly comfy whether you’re searching for secret treasure or just relaxing and watching your favorite anime.xt', 'clothes');
    //figures
    classifier.addDocument('The acclaimed Operation Yashima Statue Unit-00 & Unit-01, previously available exclusively in China in 2020, will now be released worldwide in a premium metallic color!From EVA GLOBAL comes “Rebuild of Evangelion Operation Yashima Evangelion Unit-00 & Unit-01 Premium Metallic Color Ver. Statue Set”.Based on the notorious “Operation Yashima” scene from “Evangelion: 1.0 You Are [Not] Alone,” this is a statue Set of extremely high quality.Painted metallic, the weathered texture of the Evangelion Unit-00 & Unit-01 strongly expresses the great intensity of past conflicts.With skillful use of clear materials and effect parts, the statue revives the dramatic moment when the ESV shield is used to shelter from the attack of the Angels.No detail has been overlooked in rendering the sheer impact of the dramatic moment when the positron rifle is aimed squarely at the Angel.The battlefield-inspired base is finely made with careful attention to detail, sculpted down to small debris, bringing the grand Evangelion to life right before your eyes.Each comes with a plate with a printed serial number, making this statue a truly premium masterpiece.Experience the impact of this work and immerse yourself in the unique world of Evangelion.', 'figures');
    classifier.addDocument('POP UP PARADE is a series of figures that are easy to collect with affordable prices and speedy releases! Each figure typically stands around 17-18cm in height and the series features a vast selection of characters from popular anime and game series, with many more to be added soon!', 'figures');
    classifier.addDocument('Alchemy’s finest brothers come to life in the Edward & Alphonse Elric Precious G.E.M. Series figure set. This duo embodies the wholesome brotherly bond that drives the quest for the Philosopher’s Stone. And now you can finally capture their bond in a dynamic figure set. ', 'figures');
    classifier.addDocument('Unveil the hidden depths of Yor Forger, the seemingly ordinary office worker who harbors a secret identity as the Thorn Princess, with this captivating Look Up Series Figure (Re-Run). Now, she can look up at you all day while balancing her secret hobby. Match her with Loid Forger for maximum cuteness. ', 'figures');
    classifier.addDocument('Go back to school with Satoru Gojo in this adorable Look Up Series figure (suit version). And even though he’s younger, he’s still just as stylish in this adorable suit. Let Suguru look up at you with admiration all day as he smiles. Does that make you the senpai?', 'figures');
    classifier.addDocument('The journey continues with the Frieren Noodle Stopper Figure. This serene depiction of the elven mage from “Frieren: Beyond Journey’s End” is a reminder of the timeless adventures and the bonds that transcend every adventure.', 'figures');
    classifier.addDocument('Out of Control! One of the Nendoroid lineups most famous duos is here in suits!From the anime “Jujutsu Kaisen” comes a Nendoroid of Satoru Gojo in a suit!', 'figures');
    classifier.addDocument('POP UP PARADE is a new series of figures that are easy to collect with affordable prices and releases planned just four months after preorders begin! Each figure stands around 17-18cm in height and the series features a vast selection of characters from popular anime and game series, with many more to be added soon!The third figure in the series, Goblin Slayer from the anime series GOBLIN SLAYER, is coming back for a rerelease! The weathered appearance of his battle-worn armor has been meticulously recreated. The figure is just the right size to fit any display. Be sure to add him to your collection!', 'figures');
    classifier.addDocument('Fern, the spirited apprentice, is now a Noodle Stopper Figure that captures her growth and the magic of “Frieren: Beyond Journey’s End.” Let Fern’s curiosity and courage inspire your own journey, one noodle bowl at a time.', 'figures');
    classifier.addDocument('Sit down for a chat with one of your favorite Shinobi! This Kakashi Hatake Look Up figure captures Kakashi in his early days, where every mission shaped the shinobi world’s future. It’s like the calm before the storm of the Great Ninja War, and a must-have for any true fan of the series.', 'figures');
    //accessories
    classifier.addDocument('Surprises are for idols, too! Test your luck with this Hitori Gotoh Matowooz! Mascot 4 Inch Blind Plush (Volume 1). Which one will you get? Each order is a surprise!', 'accessories');
    classifier.addDocument('From "Chainsaw Man" comes a necklace featuring a design based on Denjis cord.', 'accessories');
    classifier.addDocument('3-D Magnets with various Jiji expressions that you can display on your refrigerator (or anywhere you can place a magnet)! Enjoy collecting all types, including the secret. These come in blind boxes, so each expressin is a surprise.', 'accessories');
    classifier.addDocument('Continuing in the My Hero Academia x Hello Kitty and Friends mash-up series, the honest My Melody Ochaco joins best-friend Kitty in the FiGPiN line. This good-natured white rabbit won’t scamper away from her heroic duties, but she will float into your heart!', 'accessories');
    classifier.addDocument('Original Studio Ghibli Boh Mouse & Fly Bird key chain/strap/Bag charm of Spirited Away.Originality is confirmed by the special sticker.', 'accessories');
    classifier.addDocument('Marin Kitagawa takes the spotlight again, this time in a charming enamel keychain. The keychains vibrant colors and intricate details bring Marins dynamic personality to life, making it a charming accessory for any fan. Whether youre displaying it on your keys or backpack, this Marin keychain will constantly remind you of her endearingly nerdy charm and her love for all things cosplay', 'accessories');
    classifier.addDocument('Fear not citizen, The Symbol of Peace has arrived! Appearing in his Silver Age costume, this FiGPiN XL impresses at over 6 inches tall and is fully caped. No matter the period, All Might always has style.', 'accessories');
    classifier.addDocument('Need a new friend? Adopt a squishy of Kaburagis friendly pet, Pipe! Unlike other DECA-DENCE Gadoll, this gentle creature wont push you (or your collection) to extinction.', 'accessories');
    classifier.addDocument('An expedition needs gear, even if it’s just school or work. This backpack features a Scout Regiment hood and the “Wings of Freedom” symbol.', 'accessories');
    classifier.addDocument('Join the Survey Corps and keep track of time like a true Scout with this Attack on Titan Scout Watch. With the iconic Wings of Freedom on the dial, this watch is not just a timepiece—its a symbol of resilience in the face of Titans. Time to gear up and venture beyond the walls!', 'accessories');
    //household
    classifier.addDocument('Raise and train your own sorcerer with the Jujutsu Kaisen Tamagotchi.You can train students from Tokyo Jujutsu High, including Yuji Itadori, Megumi Fushiguro, and Nobara Kugisaki, and even Gojo-sensei! Feed them rice balls if they’re hungry or give them “kikufuku” - Gojo’s favorite sweets - when grumpy, and train them to master three mini-games!They will grow into different characters depending on how you raise them. In addition, Principal Yoruga, Iiri, and Ijichi will appear at certain periods of time. If you neglect to train your characters, the spirits will start to rejoice!', 'household');
    classifier.addDocument('Totoro nesting (or matryoshka) dolls make the perfect gift to a Totoro fan. Our item here is a modern take on the traditional Russian craft that features several characters from the film. The largest in the set of dolls is a dark gray Totoro, followed by a light gray Totoro, then a Blue Totoro, followed by the white Totoro, followed by an acorn, and finally the chain is stopped with a tiny dust bunny. Use them to decorate your room. Line them up or fill them with small items like jewelry, keys, or even snacks! Although nesting dolls are considered to a national symbol of Russia, the dolls Russian makers were actually inspired by earlier Japanese wooden nesting dolls that featured the Seven Lucky Gods, seven different Japanese deities who are believed to bring about good fortune.', 'household');
    classifier.addDocument('Thanks to Grandpa Gohan, Goku has his first Dragon Ball. Replicating the iconic 4-star ball, this USB-powered lamp has a dimmer feature and detachable base. Maybe that new girl, Bulma, can help him find the rest.', 'household');
    classifier.addDocument('Itsukushima Shrine from Nanoblock Sight to See Series stands approximately 2.55″ tall and has 540 pieces. Difficulty level is 2. This kit features all the details one would expect and is fun to build!', 'household');
    classifier.addDocument('This skateboard deck shreds just like this Titan! Just don’t use it if you’re an actual Titan. We don’t want it to break during your transformation.', 'household');
    classifier.addDocument('This Piwi plushie may be designed to look like a moss creature, but it is 100% moss-free. Add your new fluffy friend to your plush collection and appreciate the cuteness overload. Just like the anime, Piwi can fly for short distances (provided you throw him and consider the plush traveling through the air as “flying”).', 'household');
    classifier.addDocument('Relax with your favorite Sanrio Characters! These cute Sanrio Bath Bombs are the perfect way to make taking a bath even more of a treat. Put one bath bomb into a nice warm bath and watch it fizzle away to reveal a cute Sanrio friend! This set comes with the Sanrio characters in their fluffy outfits that resemble their friends. Find Kuromi, Pochacco, My Melody, Cinnamoroll, and a secret character! Collect all 6. Bath Bomb is Soap Bubble Scented.', 'household');
    classifier.addDocument('Meoooooow. This Siamese Cat Figure is purr-fect for holding things. Crafted with exquisite detail, this kitty captures the regal charm of Siamese cats and adds a touch of sophisticated purr-sonality to your shelf. Just remember, treat this feline masterpiece with respect, or you might find yourself on the wrong side of the scratching post.', 'household');
    classifier.addDocument('Forget fighting monsters; these Defense Force members are getting fancy! This blind plush gives you a formalwear party surprise. Grab one and brace yourself for cuteness. Because even heroes deserve a night off. Which one will you get?', 'household');
    classifier.addDocument('Tohru and Kanna from the “Miss Kobayashis Dragon Maid” series are now available with nightlights!This product reproduces the cute pose of the 2 characters in the ending image of the TV Anime Second Season.', 'household');
    //manga
    classifier.addDocument('Kaiju No. 8 Manga Volume 1 features story and art by Naoya Matsumoto and this limited edition features exclusive cover artwork!Kafka wants to clean up kaiju, but not literally! Will a sudden metamorphosis stand in the way of his dream?With the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achieving his childhood dream, he undergoes an unexpected transformation. How can he fight kaiju now that he’s become one himself?!Kafka hopes to one day keep his pact with his childhood friend Mina to join the Japan Defense Force and fight by her side. But while she’s out neutralizing kaiju as Third Division captain, Kafka is stuck cleaning up the aftermath of her battles. When a sudden rule change makes Kafka eligible for the Defense Force, he decides to try out for the squad once more. There’s just one problem—he’s made the Defense Force’s neutralization list under the code name Kaiju No. 8.', 'mangas');
    classifier.addDocument('Frieren: Beyond Journeys End manga volume 11 features story by Kanehito Yamada and art by Tsukasa Abe.Frieren and her companions are separated, and despite his best efforts, Denken is unable to stop his former master Macht from casting Diagoldze, turning everyone into gold! Frieren needs more time to analyze Macht’s memories, looking for a way to reverse the spell. But the demons have always underestimated Frieren, one of the greatest mages to ever live, and Macht and Solitär would do well to not count Frieren out just yet!', 'mangas');
    classifier.addDocument('Jujutsu Kaisen manga volume 23 features story and art by Gege Akutami.Sukuna reveals that he is the Disgraced One whom the Angel wants to kill. While Itadori grapples with that realization, Kenjaku sets in motion plans involving various nations, throwing the culling game into further confusion! To make matters worse, Kenjaku then shows up at the Tombs of the Star Corridor where Master Tengen exists in seclusion!', 'mangas');
    classifier.addDocument('Chainsaw Man manga volume 16 features story and art by Tatsuki Fujimoto.To live life as a normal high school student, or to become Chainsaw Man again? Denji is facing the ultimate choice and has no idea what to do. Meanwhile, a mysterious group called the Chainsaw Man Church is gaining power behind the scenes. What exactly are they plotting, and how will Denji fit into their scheme?', 'mangas');
    classifier.addDocument('The Magical Girl and the Evil Lieutenant Used to Be Archenemies Manga features story and art by Cocoa Fujiwara.She’s a magical girl, sworn to fight for peace, love, and justice. He’s a lieutenant, born into a military family that serves an evil empire. And yet, it was love at first sight… From Inu × Boku SS creator Cocoa Fujiwara comes a four-panel comic about hostile enemies who won’t kill (and love) each other!   ', 'mangas');
    classifier.addDocument('Solo Leveing Manhwa Volume 9 features story by Chugong and art by DUBU.Seeking answers, Jinwoo answers the call of the system and returns to the double dungeon that started it all. Meanwhile, after the loss of their strongest hunters, the Japanese government finds themselves struggling with particularly nasty gate and seeks outside help. Will Jinwoo be able to stop the magic beasts before they lay waste to Japan?', 'mangas');
    classifier.addDocument('Turns Out My Online Friend is My Real-Life Boss! manga volume 2 features story and art by Nmura.It’s been three months since the absolutely ordinary and plain office worker, Hashimoto, started going out with his boss, Shirase, and they’re reaching their first-month anniversary of moving in together. After the miracle discovery that “his online friend turned out to be his real-life boss,” Hashimoto and Shirase had quite the tumultuous start. But after a bunch of misunderstandings, the two are finally together…yet, their days are far from romantic when all they do are play video games and eat together! Getting worried, Hashimoto decides to try leveling up their relationship! But what do you do when your boyfriend’s successful, older, and super hot…?!', 'mangas');
    classifier.addDocument('The Fragrant Flower Blooms With Dignity manga volume 2 features story and art by Saka Mikami.Chidori High is a boys school that takes in the dregs of society with the lowest grades. Next door stands Kikyo Girls High, where the wealthy, high-class families send their precious daughters. Chidori second-year Rintaro, who has a fierce face but a gentle heart, is helping at his familys patisserie when he meets a girl named Kaoruko. The two hit it off right away…but this blissful peace is quickly disturbed when Rintaro discovers that Kaoruko is actually a student at Kikyo. Worse, she doesnt seem to realize what a huge problem this really is! Will these two be able to forge a path for themselves in this latest volume, and sidestep the traps (metaphorical and literal) laid by their classmates?', 'mangas');
    classifier.addDocument('Insomniacs After School manga volume 7 features story and art by Makoto Ojiro.After disobeying Magari’s parents, Nakami and Magari face a strict separation. Magari is banned from having any contact with Nakami beyond school. Overwhelmed with guilt, the duo reluctantly agrees to put their connection on hold. At the same time, the astronomy club faces disbandment, and the pair must make a bold move in an attempt to save it. Can Nakami and Magari defy the odds to salvage both their relationship and the future of the astronomy club?', 'mangas');
    classifier.addDocument('Crossplay Love: Otaku × Punk Manga Volume 9 features story and art by Toru.When Hanayama gets his hands on some erroneous information, he mistakenly assumes that Yuuma is a close friend of Shuumeis and kidnaps him to exact his revenge! Its not like Yuuma means anything to Shuumei, so what will Shuumei do when he finds out?! When a case of mistaken identity goes this wrong, surely something else is bound to slip!', 'mangas');

//training the nlp for categories. started with around 10 with each category
//more documents are recommended if more and more users insert more and more items, help reduce the bias
    console.log('Classifier Trained');
    classifier.train();
    //train and save, in the case of retraining the saved classifier can be used
    console.log('Classifier Saved');
    classifier.save('classifier.json', err => {
        if (err) {
            console.log('Error saving classifier:', err);
        } else {
            console.log('Classifier saved successfully.');
        }
    });
}

trainClassifier();

module.exports = {
    classifier,
    trainClassifier
};
