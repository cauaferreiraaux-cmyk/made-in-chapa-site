import { contato, endereco } from "@/conteudo/site";

/**
 * PENDENTE — domínio definitivo. Só afeta as URLs absolutas de compartilhamento
 * (Open Graph); o site funciona em qualquer host.
 */
export const URL_SITE = "https://madeinchapa.com.br";

/** Link do WhatsApp já com a conversa puxada. */
export function linkWhatsapp(
  mensagem = "Olá! Vim pelo site e queria fazer um pedido.",
): string {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const linkInstagram = `https://instagram.com/${contato.instagram}`;

/** `null` enquanto não houver endereço confirmado — o botão some sozinho. */
export function linkMapa(): string | null {
  if (!endereco) return null;
  if (endereco.mapaUrl) return endereco.mapaUrl;
  const busca = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
}
