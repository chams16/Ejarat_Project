const translations={
    en:{
        login:"Login",
        arabic:"AR",
        english:"EN",
        feature:"Feature",
        pricing:"Pricing",
        contact: "Contact Us",
        faq:"FAQ",
        join:"Join Us",
        head:"Welcome to EjaratPro The Simple and precise software to manage your Property",
        description:"Whether you are a real estate owner or an office managing the real estate of others, you can easily start working on the system and ensure that your real estate is managed in an optimal way",
        early_access:"Get early access",
        startBtn:"Get Started",
        main_feature:"Main Features",
        access:"Accessibility",
        access_content:"Your data, records and daily operations will be stored on Cloud where you can access it whenever you want and wherever you are.",
        cost:"Cost Saving",
        cost_content:"Save time -money and effort , pay as you grow on monthly basis",
        vat:"VAT Compliance",
        vat_content:"Issue Vat compatiple invoice , collect VAT in advance or distribute it on payment as per your client requiremnt or your internal policy.",
        use:"Easy to Use",
        use_description:"Ejarat Pro is simple, easy-to-learn and easy to use.It provides a streamlined way to manage your properties, enabling you and your staff a quite easy search and navigation",
        safity:"Safe and reliable",
        safity_description:" Your information and data to which you solely have access are fully encrypted",
        more_btn:"read more",
        price:"Check our pricing",
        startup:"",
        doc:"",
        doc3:"Up to 3 Documents",
        team5:"5 team Members",
        limited:"Limited Support",
        free:"Get Free",
        premuim:"",
        doc15:"UP to 15 Document",
        doc10:"UP to 10 Document",
        team25:"UP To 25 Members",
        professional:"",
        unDoc:"Unlimited Documents",
        unRev:"Unlimited Reviews",
        unMem:"Unlimited Members",
        unlimited:"Unlimited Supports",
        contact:"Contact Us",
        contact_desc:"we are here to help to manage your property and organize your work, Contact us and we are ready to help you",
        mail:"Email : Ejaratpro@gmail.com",
        phone:"Phone : +971553114030",
        address:"Address : Ajman",
        name:"Name",
        your_phone:"Phone",
        message:"Message",
        submit_btn:"Submit"

    },
    ar:{
        login:"تسجيل",
        arabic:"AR",
        english:"EN",
        feature:"خصائص",
        pricing:"التسعير",
        contact: "اتصل بنا",
        faq:"أسئلة شائعة",
        join:"انضم إلينا",
        head:"مرحبا بكم في إيجارات برو برنامج بسيط ودقيق لإدارة الممتلكات الخاصة بك",
        description:"سواء كنت مالكا عقاريا أو مكتبا يدير عقارات الآخرين ، يمكنك بسهولة البدء في العمل على النظام والتأكد من إدارة العقارات الخاصة بك بالطريقة المثلى",
        early_access:"الحصول على وصول مبكر",
        startBtn:"بدء الاستخدام",
        main_feature:"الخصائص الرئيسية",
        access:"امكانيه الوصول",
        access_content:"سيتم تخزين بياناتك وسجلاتك وعملياتك اليومية على السحابة حيث يمكنك الوصول إليها وقتما تشاء وأينما كنت.",
        cost:"توفير التكاليف",
        cost_content:"وفر الوقت والمال والجهد ، وادفع كما تنمو على أساس شهري",
        vat:"ضريبة القيمة المضافة",
        vat_content:"إصدار فاتورة متوافقة مع ضريبة القيمة المضافة أو تحصيل ضريبة القيمة المضافة مقدما أو توزيعها على الدفع وفقا لمتطلبات العميل أو سياستك الداخلية.",
        use:"سهل الاستخدام",
        use_description:"إيجارات برو بسيطة وسهلة التعلم وسهلة الاستخدام. يوفر طريقة مبسطة لإدارة الممتلكات الخاصة بك ، مما يتيح لك ولموظفيك البحث والتنقل بسهولة تامة",
        safity:"آمنة وموثوقة",
        safity_description:" يتم تشفير معلوماتك وبياناتك التي يمكنك الوصول إليها وحدك بالكامل",
        more_btn:"اقرأ أكثر",
        price:"تحقق من أسعارنا",
        startup:"بدء التشغيل",
        doc:" حتى 5 مستندات",
        doc3:"حتى 3 مستندات",
        team5:"5 أعضاء الفريق",
        limited:"دعم محدود",
        free:"احصل مجانا",
        premuim:"",
        doc15:"حتى 15 وثيقة",
        doc10:"يصل إلى 10 مستندات",
        team25:"حتى 25 عضوا",
        professional:"",
        unDoc:"وثائق غير محدودة",
        unRev:"مراجعات غير محدودة",
        unMem:"عدد غير محدود من الأعضاء",
        unlimited:"دعم غير محدود",
        contact:"اتصل بنا",
        contact_desc:"نحن هنا للمساعدة في إدارة الممتلكات الخاصة بك وتنظيم عملك ، اتصل بنا ونحن على استعداد لمساعدتك",
        mail:" البريد الإلكتروني :Ejaratpro@gmail.com ",
        phone:"الهاتف : 971553114030+",
        address:" العنوان:عجمان",
        name:"الاسم",
        your_phone:"هاتف",
        message:"رسالة",
        submit_btn:"إرسال"

    }

    
}

const languageSelector = document.querySelector("select")
    languageSelector.addEventListener("change",(event) => {
        setLanguage(event.target.value);
        localStorage.setItem("lang",event.target.value);
    });
    document.addEventListener("DOMContentLoaded",()=>{
        setLanguage(localStorage.getItem("lang"))
    });

    const setLanguage = (language)=>{
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach((element)=>{
            const translationKey = element.getAttribute("data-i18n");
            element.textContent = translations[language][translationKey];
        });
        document.dir = language==="ar" ? "rtl" : "ltr";
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://164.90.138.198/api/website/packages", false); // synchronous request
    xhr.send();
    
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        translations.en["startup"] = data[0].nameEn;
        data[0].descriptionEn.forEach((item) =>{
            const translatedText = item.trim();
            translations.en["doc"] = translatedText;
        })
        
        translations.ar["startup"] = data[0].nameAr;
        translations.ar["premuim"] = data[1].nameAr;
        translations.en["premuim"] = data[1].nameEn;
        translations.ar["professional"] = data[2].nameAr;
        translations.en["professional"] = data[2].nameEn;
        
        document.getElementById("price").innerHTML = data[0].cost
        document.getElementById("price1").innerHTML = data[1].cost
        document.getElementById("price3").innerHTML = data[2].cost
        if(data[0].numberOfDays>30 ){
            document.getElementById("duree").innerHTML = "/2M"
        }else{
            document.getElementById("duree").innerHTML = "/M"
        }
        if(data[1].numberOfDays>30){
            document.getElementById("duree1").innerHTML = "/2M"
        }else{
            document.getElementById("duree1").innerHTML = "/M"
        }
        if(data[1].numberOfDays>30){
            document.getElementById("duree2").innerHTML = "/2M"
        }else{
            document.getElementById("duree2").innerHTML = "/M"
        }
    } else {
        console.error("Error fetching data:", xhr.statusText);
    }


    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://164.90.138.198/api/website/faq", false); // synchronous request
    xhr1.send();
    
    if (xhr1.status === 200) {
        var data = JSON.parse(xhr1.responseText);
        data.forEach(item=>{
            document.getElementById("headtext").innerHTML = item.queAr
            document.getElementById("contenttext").innerHTML = item.ansAr
        })

    }
