// Fotos de ambientación (spec §7, plan §9): Wikimedia Commons, con licencia libre.
// Ninguna muestra el café (que no existe) ni a un cliente: se citan en el pie con
// autor, licencia y enlace, y se indica el cambio hecho (redimensionadas).
import type { ImageMetadata } from 'astro';
import cafeto from '../assets/fotos/cafeto.jpg';
import hacienda from '../assets/fotos/hacienda.jpg';
import panAndino from '../assets/fotos/pan-andino.jpg';
import preparacion from '../assets/fotos/preparacion.jpg';
import tazaEnMano from '../assets/fotos/taza-en-mano.jpg';
import tostador from '../assets/fotos/tostador.jpg';
import vistaFinca from '../assets/fotos/vista-finca.jpg';
import type { Clave } from '../i18n';

export interface Foto {
  src: ImageMetadata;
  /** Clave del texto alternativo en es.json (constitución III y IX) */
  alt: Clave;
  autor: string;
  licencia: 'CC0' | 'CC BY 2.0' | 'CC BY-SA 2.0' | 'CC BY-SA 3.0';
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
} satisfies Record<string, Foto>;
