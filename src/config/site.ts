/**
 * Dados da loja em um único lugar.
 * Para atualizar telefone, horário, setores etc., edite só este arquivo.
 */

export const site = {
  name: 'Agro São José',
  tagline: 'Mais que uma agropecuária!',
  city: 'Santo Antônio do Jardim - SP',
  description:
    'Agro São José em Santo Antônio do Jardim - SP: moda country, selaria, nutrição animal, máquinas, pet e veterinária. Tudo pra lida do campo, num lugar só.',

  address: {
    street: 'R. Pref. Geraldo Pérez Domingues, 41',
    district: 'Centro',
    city: 'Santo Antônio do Jardim',
    state: 'SP',
    zip: '13995-000',
  },

  phoneDisplay: '(19) 3654-1138',
  phoneTel: '+551936541138',

  /**
   * WhatsApp só no formato internacional, sem símbolos. Ex.: '5519999999999'.
   * Enquanto estiver vazio, o site mostra apenas o botão "Ligar".
   */
  whatsapp: '',

  instagram: 'https://www.instagram.com/agrosaojosejardim/',
  instagramHandle: '@agrosaojosejardim',

  rating: { score: '4,9', count: 55 },

  /** Horários (segunda a domingo). `days` usa 0=domingo ... 6=sábado. */
  hours: [
    { label: 'Segunda a sexta', days: [1, 2, 3, 4, 5], open: '06:15', close: '18:30' },
    { label: 'Sábado', days: [6], open: '06:30', close: '15:00' },
    { label: 'Domingo', days: [0], open: '07:00', close: '11:30' },
  ],
};

export const fullAddress = `${site.address.street} - ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`;

const mapQuery = encodeURIComponent(`Agro São José, ${fullAddress}`);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

export const telUrl = `tel:${site.phoneTel}`;

export function whatsappUrl(message = 'Olá! Vim pelo site da Agro São José.') {
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
    : '';
}

/** Setores da loja. `image` aponta para uma chave em components/Sectors.astro */
export const sectors = [
  {
    id: 'selaria',
    icon: 'horse',
    title: 'Selaria',
    text: 'Selas, arreios e tudo pro cavalo trabalhar e desfilar bem equipado.',
    image: 'selaria',
  },
  {
    id: 'nutricao',
    icon: 'grains',
    title: 'Nutrição Animal',
    text: 'Ração e suplementos pro gado, cavalo e criações, com linha Harpia.',
    image: 'nutricao',
  },
  {
    id: 'maquinas',
    icon: 'tractor',
    title: 'Máquinas e Ferramentas',
    text: 'Máquinas, equipamentos e peças pra facilitar o serviço na roça.',
    image: 'maquinas',
  },
  {
    id: 'pet',
    icon: 'dog',
    title: 'Pet e Veterinária',
    text: 'Ração, remédios veterinários e acessórios pro seu bicho de estimação.',
    image: 'pet',
  },
];
