const { expect } = require("chai");
const remoteApi = require("../services/remoteApi");
const sinon = require("sinon");

const jsonAsc = {
  events: [
    {
      id: "18afb4fd-eec8-42cc-906f-2cddca43396e",
      title: "Katayuno",
      description:
        "Katayuno (Katas + Desayuno) es un evento semanal organizado por la Devscola (https://twitter.com/devscola) cada martes por la mañana. Durante el Katayuno, paireamos katas para aprender TDD mientras disfrutamos de un delicioso desayuno.\n\nLa Cova proporciona tanto el espacio como el café, y si quieres desayunar, puedes traerte algo de casa o comprar algo en los hornos cerca de la Cova.\n\n¡Te esperamos!",
      date: "2018-11-27T07:00:00Z",
      link:
        "https://www.meetup.com/Aprende-a-programar-en-Valencia/events/vxlnjqyxpbkc/",
      hashtag: "@devscola",
      slug: "katayuno-5bf1b42e3df9"
    },
    {
      id: "76e6d805-dbd7-43c4-ab27-9906afec2f0e",
      title: "Conferencia de Richard Stallman",
      description:
        'Richard Stallman, el gurú del Software Libre, visitará la Universitat de València el próximo martes 27 de noviembre a las 18h. Invitado por la Escola Tècnica Superior d’Enginyeria de la Universitat de València (ETSE-UV) en colaboración con la Unitat de Cultura Científica de la Universitat de València, Open Xarxes Coop. V. y la asociación GNU/Linux València, realizará una conferencia en la Sala Darwin del Campus de Burjassot-Paterna sobre “Software libre en la Ética y en la Práctica”.\n\nLa Escola Tècnica Superior d’Enginyeria de la Universitat de València (ETSE-UV) celebra los 25 años de los estudios de ingeniería en la Universitat con una serie de actos, entre ellos acogiendo una conferencia de este activista del movimiento por el software libre. Con su peculiar sentido del humor, hablará sobre las metas y la filosofía del movimiento del Software Libre, y el estado y la historia del sistema operativo GNU, el cual junto con el núcleo Linux, es actualmente utilizado por decenas de millones de personas en todo el mundo y con libertad para copiarlo, realizar cambios y distribuirlo. Su uso va desde el ámbito más doméstico, hasta su empleo en empresas e instituciones\n\nEl Dr. Richard Stallman (EEUU, 1953) lanzó el movimiento software libre en 1983 y el desarrollo del sistema operativo GNU/Linux en 1984. Stallman ha recibido numerosos premios de importancia en el campo de la informática como son el premio "Grace Hopper" de la ACM (ACM Grace Hopper Award), una beca de la Fundación MacArthur, el premio "Pionero" de la Fundación Frontera Electrónica, y el Premio Takeda por Mejora Social/Económica, así como también doctorados honoris causa de casi una veintena de universidades, y ha ingresado en el Salón de la Fama de Internet.',
      date: "2018-11-27T16:30:00Z",
      link:
        "https://www.uv.es/uvweb/ingenieria/es/novedades/conferencia-richard-stallman-1285923366775/Novetat.html?id=1286057593538",
      hashtag: "@ETSEUV",
      slug: "conferencia-de-richard-stallman-5bf6de6b4d7d"
    },
    {
      id: "f5d17cd1-12bd-46ce-a400-a51745225f07",
      title: "TDD by Example",
      description:
        'En la Devscola vamos a hacer un curso de 3 días enfocados en aprender TDD. Las sesiones tendrán lugar del 27 al 29 de Noviembre a las 18:00 en la Cova de Benimaclet y serán facilitadas por Sam Payá (@sapagat).\n\nEl contenido es el siguiente:\n\nSesión I, 27-Noviembre: Sam, hará una introducción a la kata Money, siguiendo la misma didacta del libro "TDD by Example" de Kent Beck, esta vez en Javascript. Durante esta introducción veremos cómo plantear los tests, hacer pasos lo más pequeños posibles y refactorizar a patrones.\n\nSesión II, 28 Noviembre: Durante esta sesión aplicaremos las prácticas y técnicas explicadas en la primera. Haremos iteraciones en conjunto y las iremos compartiendo para entender cómo afectan al resultado final.\n\nSesión III, 29 Noviembre: En esta sesión nos centraremos en varios ejemplos para aplicar otro tipo de técnicas como la injección de dependencias y dobles de test.\n\nPara poder disfrutar del curso, hacen falta: nociones básicas de programación, un editor de texto y un navegador. No hace falta instalar nada más.\n',
      date: "2018-11-27T17:00:00Z",
      link:
        "https://www.meetup.com/Aprende-a-programar-en-Valencia/events/256592476",
      hashtag: "@devscola",
      slug: "tdd-by-example-5bf520d23229"
    },
    {
      id: "6ae7aadf-5073-4428-acff-93af4f3bce2d",
      title: "Martes de puertas abiertas",
      description:
        "Todos los martes el Hackerspace Valencia celebra su jornada de puertas abiertas donde los socios se reúnen para trabajar en diferentes proyectos. Además, todos los no socios son bienvenidos para conocer el espacio, la Asociación y en lo que estamos trabajando.\n\nEl horario de apertura es de 6:30 hasta las 8:30.",
      date: "2018-11-27T17:30:00Z",
      link: "https://www.meetup.com/Hackerspace-Valencia/events/qnpqqmyxpbkc/",
      hashtag: "@HackVlc",
      slug: "martes-de-puertas-abiertas-5bf1b7443dfd"
    },
    {
      id: "6139162d-6cb6-4907-9177-ca501d221652",
      title: "Master Class: 10 pasos para mejorar tu Marketing B2B",
      description:
        "En esta master class entenderás qué es el marketing B2B y las diferencias con el B2C. Abordaremos las claves para llevar a cabo con éxito distintas estrategias de marketing digital para empresas industriales y de servicios. A través de best practices y casos reales explicaremos cómo realizar un Plan de Marketing Digital para una empresa B2B, con especial atención a las claves para mejorar el B2B Branding.\n\nLa sesión tendrá lugar en la EEME Business School, concretamente en el Aula Magna que cuenta con un aforo de 50 plazas. Como siempre, la entrada es gratuita pero para poder asistir es necesario rellenar el formulario de inscripción previa de la Master Class.",
      date: "2018-11-27T18:00:00Z",
      link:
        "https://www.eeme.bs/agenda/e/master-class-marketing-b2b/?utm_campaign=victechhub",
      hashtag: "@eemebs",
      slug: "master-class-10-pasos-para-mejorar-tu-marketing-b2b-5be9711319e3"
    },
    {
      id: "d79772f1-08d6-4ed2-aad5-563d1bce5be6",
      title: "10è Databeers VLC",
      description:
        "Have ever data helped you in any way to understand something a bit better? Do you use data analysis in your everyday practice?\n\nHave you ever built a service built on data? Do you have any kind of artistic project based on data? Are you obsessed with data at any level? And finally, do you like beer?\n\nThe boom of big data is only an extensive continuation of a classic field of data analysis, and we want to discuss about this with beers and interested people in Valencia.",
      date: "2018-11-28T18:00:00Z",
      link:
        "https://docs.google.com/forms/d/17-fl8rFmalNmm5IBTiDbeCIE8CYn1wrm3LLTsp-1pb8/viewform?edit_requested=true",
      hashtag: "@databeersvlc",
      slug: "10e-databeers-vlc-5bf6df7c4d7e"
    },
    {
      id: "624c1240-efc4-4c92-9ac9-ae8919ef297d",
      title: "React architectures emerged from the teams",
      description:
        "Cuando nuestros proyectos en React adquieren una envergadura considerable, muchos de nosotros nos planteamos que tipo de arquitectura deberíamos usar. ¿Crees que es buena idea utilizar arquitecturas usadas tradicionalmente en Backend? ¿Qué están haciendo otras empresas con proyectos grandes?\n\nEn Mercadona Tech nos hemos hecho estas mismas preguntas y no hemos encontrado demasiadas respuestas. Por eso, queremos contar cómo ha sido la evolución de nuestra arquitectura en el Frontend y cómo desde el equipo emergen los patrones y soluciones a los problemas que nos vamos encontrando cuando los proyectos se vuelven enormes.\n\nAdemás, queremos animar a otras empresas a que compartan en la comunidad los problemas de arquitectura que se están encontrando y cómo los están solucionando.\n",
      date: "2018-11-28T18:00:00Z",
      link: "https://www.meetup.com/ValenciaJS/events/256538869/",
      hashtag: "@VlcJS",
      slug: "react-architectures-emerged-from-the-teams-5bf2c70e0318"
    },
    {
      id: "718850c2-24be-43ef-86bf-5e067b8a18ab",
      title: "HackNight Valencia - 7th Anniversary Edition",
      description:
        "Las HackNights son un evento mensual en el que cada noche la hace la gente que acude.\n\n¿Tienes algún proyecto interesante que compartir? Tráelo y seguro que encontrarás a alguien que le interese.\n\n¿Tienes alguna inquietud? Tráelas también.\n\n¿Quieres simplemente ayudar a alguien? Mucha gente te lo agradecerá.\n\n¿Nada de lo anterior? ¡No te preocupes! Siempre podrás hacer networking y hablar con otros.\n\nA las 19:30 cada uno nos introducimos para decir en qué vamos a trabajar esa noche, no importa en qué. Simplemente trae lo necesario para llevarlo a cabo,\n\nFlywire pone unos snacks y bebida, y más tarde a las 22:00 pedimos unas pizzas para los que quieran cenar.\n\n---\n\nHackNights are a monthly event in which each night depends on the people that's coming.\n\nAbout 19:30, we introduce ourselves to tell everyone what's our goal that night, it doesn't matter what, just don't forget to bring what do you need to make it happen, if not, just be eager to meet new people or join some to hack something with.\n\nFlywire provides snacks and beberages, and later on about 22:00 we order some pizza.\n",
      date: "2018-11-29T18:00:00Z",
      link: "https://www.meetup.com/HackNight-Valencia/events/gbtjknyxpbmc/",
      hashtag: "@HackNightVLC",
      slug: "hacknight-valencia-7th-anniversary-edition-5bf1b4043df8"
    },
    {
      id: "a6f3cfc1-d747-4ebb-a9d2-5ed428d0af20",
      title: "Pipenv: El nuevo gestor de paquetes de python",
      description:
        "En esta charla enseñaremos como funciona el nuevo sistema de gestión de paquetes para Python llamado Pipenv.",
      date: "2018-11-29T18:00:00Z",
      link:
        "https://www.meetup.com/es-ES/Python-Valencia-Meetup/events/256572789/",
      hashtag: "",
      slug: "pipenv-el-nuevo-gestor-de-paquetes-de-python-5bf44631d8e7"
    },
    {
      id: "8f06d822-f459-4ec8-bc3d-1b4ce812ce76",
      title: "Grupo de Arduino del Hackerspace Vlc: Sensores",
      description:
        "El sábado día uno de diciembre, volvemos a reunir al grupo de Arduino en esta ocasión para empezar a estudiar el tema de sensores. Empezaremos a estudiar los sensores de infrarrojos que utilizaremos en el proyecto del robot siguelíneas en el que empezaremos a trabajar pronto.\n\nSe recomienda a cada asistente traer su propio material para poder trabajar cómodamente. Para esta primera reunión, hace falta un Arduino (Uno o Leonardo), una protoboard y un portátil con Arduino IDE instalado. Tambien hara falta tener sensores de infrarrojos como estos (o similares): https://solectroshop.com/product-eng-919-Sensor-Module-Infrared-Sensor-Barriers-Car-Robot.html\n\nEn caso de no contar con el material necesario, la asociación proveerá de material aunque tal vez sea necesario compartir.\n\nLa reunión será en el local del Hackerspace el sábado 1 de diciembre de 10:00 a 13:00 aproximadamente. Para los asistentes no socios, tendrá un coste de 5€ que será destinado a pagar los costes del local, así como a comprar material para las futuras reuniones del grupo.",
      date: "2018-12-01T09:00:00Z",
      link:
        "https://www.meetup.com/es-ES/Hackerspace-Valencia/events/256628785",
      hashtag: "@HackVlc",
      slug: "grupo-de-arduino-del-hackerspace-vlc-sensores-5bf6f2044d7f"
    },
    {
      id: "8c9d99fb-9f24-41a6-9661-36d284b5fe93",
      title: "Building Docker images in a smarter way",
      description:
        "Why do we need lighter images?\nHow can we have lighter images?\nAre we testing our images properly?\nAre our images secure enough?\n\nLet's answer this questions next December 12th!\n\nLanguage: the talk will be in Spanish, but the speaker can answer some questions in English :P",
      date: "2018-12-12T18:00:00Z",
      link: "https://www.meetup.com/Valencia-DevOps/events/256597538/",
      hashtag: "@valenciadevops",
      slug: "building-docker-images-in-a-smarter-way-5bf59de3322a"
    },
    {
      id: "9a42bc60-3389-47db-8c64-f3e5a61a9075",
      title: "AfterTest Valencia: Una nota sobre pruebas de infraestructura",
      description:
        'Desde nexoQA os invitamos a participar a nuestro último AfterTest en Valencia del año, y esta vez con una charla sobre pruebas de infraestructura.\n\nUno de los factores clave para garantizar la calidad dentro de los proyectos de software exitosos es tener una infraestructura totalmente automatizada, compuesta de scripts y lenguajes que permitan una implementación rápida y segura de redes, servidores y su configuración. Esto es lo que llamamos "Infraestructura como Código" y "Configuración como Código". Las herramientas populares que implementan estos conceptos son Terraform, Ansible y Puppet.\n\nTener los desplegables de nuestra infraestructura expresados ​​en código tiene muchos beneficios, perteneciente al desarrollo, donde puedes versionar la infraestructura, aplicar revisiones, automatizar y lo más importante ¡probarlo!\n\nAl igual que con el testing de código, también debemos probar nuestra infraestructura para asegurarnos que funciona y, en este AfterTest, Fernando Llaca te explicará algunas de las experiencias que ha tenido con el testing de infraestructura. También te dará consejos y recomendaciones para las prácticas al probar los roles de Ansible, que también son lo suficientemente genéricos para aplicar a la mayoría de las herramientas y marcos de test. \n ',
      date: "2018-12-13T20:00:00Z",
      link:
        "https://www.eventbrite.es/e/entradas-aftertest-valencia-una-nota-sobre-pruebas-de-infraestructura-52404417022",
      hashtag: "@expoqa",
      slug:
        "aftertest-valencia-una-nota-sobre-pruebas-de-infraestructura-5bf1bb9d3e00"
    },
    {
      id: "08c8bfe9-d6ed-4033-9d8d-1487f8c2e2d5",
      title: "Metodologías Ágiles en el mundo real",
      description:
        "En esta reunión de Agile Levante hablaremos de como afrontamos las metodologías ágiles en nuestro día a día en nuestro lugar de trabajo. ¿Utilizamos Scrum? ¿Lean? ¿Kanban? ¿Nuestro propio sistema?\n\nComo siempre, el formato de la mesa redonda será el de Fish Bowl. Para quien no lo conozca, podéis leer la página de la Wikipedia al respecto: https://en.wikipedia.org/wiki/Fishbowl_(conversation).\n\nEste evento se realizará en la Universidad Politécnica de Valencia, en la ETSINF, aula 0.0 del edificio 1E. Este evento es un esfuerzo conjunto de Infusión ( http://www.infusionvlc.com/ ) y Agile Levante para acercar a las comunidades tecnológicas de Valencia a la comunidad de estudiantes.",
      date: "2018-12-14T17:30:00Z",
      link: "https://www.meetup.com/Agile-Levante/events/256541701/",
      hashtag: "@AgileLevante",
      slug: "metodologias-agiles-en-el-mundo-real-5bd83694b25f"
    },
    {
      id: "b5a43a9b-d064-4980-8b71-847c6c3b2ac1",
      title: "Master Class: 15 tendencias de Marketing Digital para 2019",
      description:
        "2018 es hablar del pasado. Nuevas herramientas y tecnologías emergen cada día, pero ¿qué nos depararán estos próximos años? En esta master class repasamos algunas de estas tendencias que sin duda jugarán un papel muy importante en cualquier estrategia de marketing online. ¡No faltes y no olvides tomar nota!\n\nLa sesión tendrá lugar en la EEME Business School, concretamente en el Aula Magna que cuenta con un aforo de 50 plazas. Como siempre, la entrada es gratuita pero para poder asistir es necesario rellenar el formulario de inscripción previa de la Master Class.\n\nEnlace a formulario de inscripción:https://www.eeme.bs/agenda/e/master-class-tendencias-marketing-digital-2019/?utm_campaign=vlctechhub",
      date: "2018-12-20T18:00:00Z",
      link:
        "https://www.eeme.bs/agenda/e/master-class-tendencias-marketing-digital-2019/?utm_campaign=vlctechhub",
      hashtag: "#eemebusinessschool",
      slug:
        "master-class-15-tendencias-de-marketing-digital-para-2019-5bf672744d7b"
    }
  ]
};

const jsonDesc = {
  jobs: [
    {
      id: "october",
      published_at: "2018-10-25T17:00:00Z"
    },
    {
      id: "november",
      published_at: "2018-11-25T17:00:00Z"
    },
    {
      id: "december",
      published_at: "2018-12-25T17:00:00Z"
    }
  ]
};

describe("test API calls", () => {
  it("should return valid set of events", done => {
    remoteApi.fetchData("events").then(json => {
      expect(json).to.be.a("object");
      expect(json).to.have.property("events");
      done();
    });
  });
});

it("should return valid set of jobs", done => {
  remoteApi.fetchData("jobs").then(json => {
    expect(json).to.be.a("object");
    expect(json).to.have.property("jobs");
    done();
  });
});

describe("test getLatestItem function", () => {
  it("should return latest item in a set when sort order is ascending", () => {
    const latestItemId = remoteApi.getLatestItem("date", jsonAsc.events);
    expect(latestItemId.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1");
  });
  it("should return latest item in a set when sort order is descending", () => {
    const latestItemId = remoteApi.getLatestItem("published_at", jsonDesc.jobs);
    expect(latestItemId.id).to.equal("december");
  });
});

describe("test getLatestItemForType function", () => {
  const fetch = sinon.stub().resolves(jsonDesc);
  it("should return latest event ID", done => {
    remoteApi.getLatestItemForType("jobs", fetch).then(res => {
      expect(res.id).to.equal("december");
      done();
    });
  });
});
