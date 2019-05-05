const { expect } = require("chai")
const remoteApi = require("../../services/remoteApi")
const sinon = require("sinon")

const jsonAsc = {
    events: [
        {
            id: "18afb4fd-eec8-42cc-906f-2cddca43396e",
            date: "2018-11-27T07:00:00Z",
        },
        {
            id: "76e6d805-dbd7-43c4-ab27-9906afec2f0e",
            date: "2018-11-27T16:30:00Z",
        },
        {
            id: "b5a43a9b-d064-4980-8b71-847c6c3b2ac1",
            date: "2018-12-20T18:00:00Z",
        },
    ],
}

const jsonDesc = {
    jobs: [
        {
            id: "b5a43a9b-d064-4980-8b71-847c6c3b2ac1",
            published_at: "2018-12-20T18:00:00Z",
        },
        {
            id: "76e6d805-dbd7-43c4-ab27-9906afec2f0e",
            published_at: "2018-11-27T16:30:00Z",
        },
        {
            id: "18afb4fd-eec8-42cc-906f-2cddca43396e",
            published_at: "2018-11-27T07:00:00Z",
        },
    ],
}

const jsonEvents = {
    events: [
        {
            id: "88e7ddd0-6002-4831-bf46-e8887278df8b",
            title: "Mesa redonda TDD",
            description:
                "En esta sesión comentaremos nuestras experiencias con TDD y testing en general: distintos workflows, filosofías, frameworks de testing en Ruby, cómo empezar…\n\nLa sesión seguirá un formato mesa redonda para lanzar y profundizar el tema y se abrirá posteriormente a que los asistentes puedan aportar sus propias perspectivas.\n",
            date: "2019-05-02T16:30:00Z",
            link: "http://valenciarb.org/2019/05/02/mesa-redonda-tdd.html",
            hashtag: "@valenciarb",
            slug: "mesa-redonda-tdd-5cc08787f07f",
        },
        {
            id: "fa63a5f7-7c6e-499f-93ef-0cf2f4c72a56",
            title: "Cypherpunks y Bitcoin",
            description:
                'No os perdáis el próximo meetup de Avalbit, esta vez con un tema sorprendente: "Cypherpunks y Bitcoin".\nNuestro ponente, Alfre Mancera, experto en Marketing y "fascinado por la tecnología y la psicología humana".\n¡Os esperamos!\n',
            date: "2019-05-03T16:00:00Z",
            link: "https://www.meetup.com/ValenciaBitcoin/events/260403383/",
            hashtag: "@avalBit",
            slug: "cypherpunks-y-bitcoin-5cbb04f60356",
        },
        {
            id: "35abae98-7e73-4c9c-9f9f-3717b20d6102",
            title: "Google I/0 Extended 2019 Valencia",
            description:
                "El Google I/O es un congreso de desarrolladores, diseñadores y apasionados por la tecnología organizado anualmente por Google y que se replica en cada ciudad del mundo en forma de los I/O Extended, para presentar los últimos lanzamientos y las nuevas tecnologías que tiene Google para nosotros. ¡Ven y forma de este gran evento!\n\nEn colaboración con Meetmobile Valencia, el martes 7 de mayo nos conectaremos en streaming para asistir en directo a la keynote principal que inaugura el Google I/O 2019 en Mountain View, California.\n\nAl finalizar disfrutaremos de unas cervezas, refrescos y algo de picar para comentar lo visto en la keynote y hacer networking, cortesía de vBote.\n",
            date: "2019-05-07T16:30:00Z",
            link: "https://www.meetup.com/GDGValencia/events/260564525/",
            hashtag: "@gdgvalencia",
            slug: "google-i-0-extended-2019-valencia-5cb6c2921e06",
        },
        {
            id: "76de247a-a816-4fef-bd05-34cc894db722",
            title: "VLCTechFest",
            description:
                "Es un día de charlas por y para las comunidades tecnológicas de la Comunidad Valenciana. Es un día para descubrir, conectar y compartir.\n\nUn formato de conferencia con varios tracks simultáneos con charlas para todos los gustos, con tiempo para preguntas y espacio para el networking.\n\nUn festival donde el foco está en la participación, por lo que es un evento gratuito y de acceso libre sin entrada hasta completar aforo. La primera edición 2018 fue todo un éxito y mas de 120 asistentes pasaron por VLCTechFest.",
            date: "2019-05-11T07:30:00Z",
            link: "https://vlctechfest.org/es/",
            hashtag: "@vlctechfest",
            slug: "vlctechfest-5c14cf9bdfd3",
        },
        {
            id: "e296dc1f-d637-40f5-b7b0-fd41ea79ce03",
            title: "Scratch Day Valencia",
            description:
                "Ven con nosotros a participar en la celebración del Scratch Day, un evento mundial para aprender y demostrar lo que puede hacerse con este aplicación para programar videojuegos y animaciones.\n\nAdemás de reservar plaza, el asistente debe traer su ordenador o tablet para participar.\n\nEdad recomendada, a partir de 6 años.",
            date: "2019-05-11T15:30:00Z",
            link: "http://scratchdayvlc19.eventbrite.es",
            hashtag: "@bylinedu",
            slug: "scratch-day-valencia-5cb4bf07dd56",
        },
        {
            id: "f902ee77-fa8e-49d6-b9ae-007242a305c2",
            title: "Master Class: Be distinct or Become extinct!",
            description:
                "Descubre cómo ha evolucionado Oh my Cut! desde su arranque hasta convertirse en un referente del sector de la peluquería y belleza en un mercado altamente competitivo, poco profesionalizado y tremendamente analógico mediante una apuesta clara de diferenciación a través del desarrollo de marca y la transformación digital.\n\nLa sesión tendrá lugar en la EEME Business School, concretamente en el Aula Magna que cuenta con un aforo de 50 plazas. Como siempre, la entrada es gratuita pero para poder asistir es necesario rellenar el formulario de inscripción previa de la Master Class.\n\nEnlace al formulario: https://www.eeme.bs/agenda/e/master-class-be-distinct-or-become-extinct/?utm_campaign=vlctechhub",
            date: "2019-05-16T17:00:00Z",
            link:
                "https://www.eeme.bs/agenda/e/master-class-be-distinct-or-become-extinct/?utm_campaign=vlctechhub",
            hashtag: "@eemebs",
            slug: "master-class-be-distinct-or-become-extinct-5cb895b6a7fc",
        },
        {
            id: "664f3b8c-032a-4c94-91fa-6b6bbcb9d2ae",
            title: "DjangoGirls Valencia",
            description:
                "¿Eres mujer y no sabes programar?\n\n¡Ah!, ¿que ya sabes programar pero no conoces Django?\n\nNo hay problema, en cualquiera de los dos casos, DjangoGirls es un taller para ti.\n\nDjangoGirls es una asociación global sin ánimo de lucro, cuyo objetivo es acercar a todas las mujeres al fascinante mundo de la programación. Contamos con la colaboración de profesionales del sector que os mentorizarán durante la jornada. La finalidad del taller es que hagáis un blog y lo publiquéis en Internet.\n\nLo realizaremos el día 18 de mayo en las oficinas de Mercadona Tech en la ciudad de Valencia. El taller es gratuito, aunque hay plazas limitadas. ¡Corre y reserva la tuya antes del 18 de abril!\n\nDurante el primer día te ayudaremos a configurar todo lo necesario para poder empezar a programar. Solo necesitarás tu portátil 💻 y muchas ganas de aprender. ",
            date: "2019-05-18T06:30:00Z",
            link: "https://djangogirls.org/valencia/",
            hashtag: "@DjangoGirlsVLC",
            slug: "djangogirls-valencia-5c9bb0261ed3",
        },
        {
            id: "628c5179-f2f9-44b8-90c4-1bec074e60d4",
            title: "Vue Day",
            description:
                " The 2nd edition of Vue Day is here: a full day to learn about your favorite framework from local, national and international speakers.\n\nSee you on Friday May 31 at the Panoramis Cinema, in the beautiful Port of Alicante. ",
            date: "2019-05-31T07:00:00Z",
            link: "https://vueday.org/",
            hashtag: "@VueDay",
            slug: "vue-day-5caf3a7c17d7",
        },
    ],
}

describe("test API calls", () => {
    it("should return valid set of events", done => {
        remoteApi.fetchData("events").then(json => {
            expect(json).to.be.a("object")
            expect(json).to.have.property("events")
            done()
        })
    })
})

it("should return valid set of jobs", done => {
    remoteApi.fetchData("jobs").then(json => {
        expect(json).to.be.a("object")
        expect(json).to.have.property("jobs")
        done()
    })
})

describe("test getLatestItem function", () => {
    it("should return latest item in a set when sort order is ascending", () => {
        const latestItemId = remoteApi.getLatestItem("date", jsonAsc.events)
        expect(latestItemId.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1")
    })
    it("should return latest item in a set when sort order is descending", () => {
        const latestItemId = remoteApi.getLatestItem("published_at", jsonDesc.jobs)
        expect(latestItemId.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1")
    })
})

describe("test fetchLatestItemForType function", () => {
    const fetch = sinon.stub().resolves(jsonDesc)
    it("should return latest event ID", done => {
        remoteApi.fetchLatestItemForType("jobs", fetch).then(res => {
            expect(res.id).to.equal("b5a43a9b-d064-4980-8b71-847c6c3b2ac1")
            done()
        })
    })
})

describe("test fetchEventsByDate function", () => {
    it("should compare the day, month and year of two dates", () => {
        const dateA = "2019-05-02T16:30:00Z"
        const dateB = "2019-05-02T20:00:00Z"
        const match = remoteApi.compareDate(dateA, dateB)
        expect(match).to.equal(true)
    })
    it("should fail if day, month or year of two dates don't match", () => {
        const dateA = "2019-05-02T16:30:00Z"
        const dateB = "2019-05-03T20:00:00Z"
        const match = remoteApi.compareDate(dateA, dateB)
        expect(match).to.equal(false)
    })

    const fetch = sinon.stub().resolves(jsonEvents)
    it("should return an array of events by date", done => {
        remoteApi.fetchEventsByDate("2019-05-11", fetch).then(res => {
            expect(res).to.be.of.length(2)
            expect(new Date(res[0].date).getDate()).to.equal(11)
            expect(new Date(res[0].date).getMonth()).to.equal(4)
            expect(new Date(res[0].date).getYear()).to.equal(119)
            expect(new Date(res[1].date).getDate()).to.equal(11)
            expect(new Date(res[1].date).getMonth()).to.equal(4)
            expect(new Date(res[1].date).getYear()).to.equal(119)
            done()
        })
    })
})
