// Fotos de ambientación (spec §7, plan §9): Wikimedia Commons, con licencia libre.
// Ninguna muestra el café (que no existe) ni a un cliente: se citan en el pie con
// autor, licencia y enlace, y se indica el cambio hecho (redimensionadas). Las de la
// carta (src/assets/fotos/carta/) son ilustrativas de cada plato, recortadas en cuadrado.
import type { ImageMetadata } from 'astro';
import cafeto from '../assets/fotos/cafeto.jpg';
import hacienda from '../assets/fotos/hacienda.jpg';
import panAndino from '../assets/fotos/pan-andino.jpg';
import preparacion from '../assets/fotos/preparacion.jpg';
import tazaEnMano from '../assets/fotos/taza-en-mano.jpg';
import tostador from '../assets/fotos/tostador.jpg';
import vistaFinca from '../assets/fotos/vista-finca.jpg';
import arepaTrigo from '../assets/fotos/carta/arepa-trigo.jpg';
import cachito from '../assets/fotos/carta/cachito.jpg';
import conLeche from '../assets/fotos/carta/con-leche.jpg';
import espresso from '../assets/fotos/carta/espresso.jpg';
import filtrado from '../assets/fotos/carta/filtrado.jpg';
import golfeado from '../assets/fotos/carta/golfeado.jpg';
import guayoyo from '../assets/fotos/carta/guayoyo.jpg';
import mantecada from '../assets/fotos/carta/mantecada.jpg';
import marron from '../assets/fotos/carta/marron.jpg';
import pastelitos from '../assets/fotos/carta/pastelitos.jpg';
import perico from '../assets/fotos/carta/perico.jpg';
import pisca from '../assets/fotos/carta/pisca.jpg';
import type { Clave } from '../i18n';

export interface Foto {
  src: ImageMetadata;
  /** Clave del texto alternativo en es.json (constitución III y IX) */
  alt: Clave;
  autor: string;
  licencia: 'CC0' | 'CC BY 2.0' | 'CC BY 4.0' | 'CC BY-SA 2.0' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0';
  licenciaUrl: string;
  fuente: string;
}

const commons = (archivo: string) => `https://commons.wikimedia.org/wiki/File:${archivo}`;

export const FOTOS = {
  vistaFinca: {
    src: vistaFinca,
    alt: 'foto.vistaFinca',
    autor: 'Matthias Kirsch',
    licencia: 'CC BY-SA 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    fuente: commons('View_from_the_coffee_farm.jpg'),
  },
  hacienda: {
    src: hacienda,
    alt: 'foto.hacienda',
    autor: 'Matthias Kirsch',
    licencia: 'CC BY-SA 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    fuente: commons('Coffee_farm_with_the_surrounding_mountains.jpg'),
  },
  cafeto: {
    src: cafeto,
    alt: 'foto.cafeto',
    autor: 'Juan Carlo Castillo Ortega',
    licencia: 'CC BY-SA 3.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    fuente: commons('Cafeto_en_la_Sierra_Falconiana.JPG'),
  },
  panAndino: {
    src: panAndino,
    alt: 'foto.panAndino',
    autor: 'Muago',
    licencia: 'CC0',
    licenciaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    fuente: commons('Pan_andino_2.jpg'),
  },
  tazaEnMano: {
    src: tazaEnMano,
    alt: 'foto.tazaEnMano',
    autor: 'Shixart1985',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fuente: commons('Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg'),
  },
  tostador: {
    src: tostador,
    alt: 'foto.tostador',
    autor: 'Jkafader',
    licencia: 'CC BY-SA 3.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    fuente: commons('Beans_Dropping_from_a_Coffee_Roaster.JPG'),
  },
  preparacion: {
    src: preparacion,
    alt: 'foto.preparacion',
    autor: 'Shixart1985',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fuente: commons('Hands_prepare_black_coffee_on_a_wooden_table_in_a_cozy_kitchen_setting.jpg'),
  },
  espresso: {
    src: espresso,
    alt: 'foto.espresso',
    autor: 'Osman Bas',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fuente: commons('Doppio.jpg'),
  },
  guayoyo: {
    src: guayoyo,
    alt: 'foto.guayoyo',
    autor: 'Nenad Stojkovic',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fuente: commons('Black_coffee_on_wooden_table_outdoors._(51528275111).jpg'),
  },
  marron: {
    src: marron,
    alt: 'foto.marron',
    autor: 'Alfonso Salgueiro Lora',
    licencia: 'CC BY 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fuente: commons('Café_cortado_-_Alfonso_Salgueiro.jpg'),
  },
  filtrado: {
    src: filtrado,
    alt: 'foto.filtrado',
    autor: 'Indigo.udm',
    licencia: 'CC BY 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by/4.0/',
    fuente: commons('Tasty_Coffee_pourover_V60_bloom_2025.jpg'),
  },
  conLeche: {
    src: conLeche,
    alt: 'foto.conLeche',
    autor: 'Lisa Stevens',
    licencia: 'CC BY-SA 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    fuente: commons('Taza_de_café_con_leche.jpg'),
  },
  mantecada: {
    src: mantecada,
    alt: 'foto.mantecada',
    autor: 'Rodelar',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    fuente: commons('Mantecadas_de_Astorga.jpg'),
  },
  golfeado: {
    src: golfeado,
    alt: 'foto.golfeado',
    autor: 'Muago',
    licencia: 'CC0',
    licenciaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    fuente: commons('Golfeado_4.jpg'),
  },
  cachito: {
    src: cachito,
    alt: 'foto.cachito',
    autor: 'Wladimir Labeikovsky',
    licencia: 'CC BY-SA 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    fuente: commons('Cachitos_close-up_(3175160347).jpg'),
  },
  pisca: {
    src: pisca,
    alt: 'foto.pisca',
    autor: 'Marcelo Träsel',
    licencia: 'CC BY-SA 2.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    fuente: commons('Changua_(3280423014).jpg'),
  },
  arepaTrigo: {
    src: arepaTrigo,
    alt: 'foto.arepaTrigo',
    autor: 'Raymvc97',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    fuente: commons('Arepa_de_harina_de_trigo.jpg'),
  },
  pastelitos: {
    src: pastelitos,
    alt: 'foto.pastelitos',
    autor: 'Julio Sifontes',
    licencia: 'CC BY-SA 3.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    fuente: commons('Pastelitos_Andinos.jpg'),
  },
  perico: {
    src: perico,
    alt: 'foto.perico',
    autor: 'Pequeño mar',
    licencia: 'CC BY-SA 4.0',
    licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    fuente: commons('Arepa_perico.jpg'),
  },
} satisfies Record<string, Foto>;
