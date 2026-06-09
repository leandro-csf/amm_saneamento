# Hotsite — Parceria AMM + IPGC · Saneamento para Minas

Site institucional de intermediação da parceria entre a **Associação Mineira de Municípios (AMM)** e o **Instituto de Planejamento e Gestão de Cidades (IPGC)**, firmada em 13/05/2026 no âmbito do Programa Nacional Brasil Parceiro.

O hotsite apresenta o modelo de estruturação de **concessões e PPPs de infraestrutura urbana** para municípios mineiros — com destaque para o saneamento básico —, conduzindo prefeitos e gestores ao canal de contato da parceria.

## Proposta de valor

Municípios recebem **estudos técnicos completos (EVTEJA)** de viabilidade, modelagem e assessoria no processo licitatório **sem custo**: os custos dos estudos são ressarcidos pela empresa vencedora da licitação, nos termos do art. 21 da Lei 8.987/95.

## Setores cobertos

**Saneamento básico (foco principal)**
- Abastecimento de Água Potável
- Esgotamento Sanitário
- Resíduos Sólidos & Limpeza Urbana
- Drenagem Pluvial Urbana

**Outros setores da parceria**
- Usina Solar (UFV) · Iluminação Pública · Telecom & Cidade Inteligente
- Transformação Digital · Funerário & Cemitério · Centros Administrativos · Infraestrutura Social

## Tecnologia

100% estático — HTML + CSS + JavaScript puro de navegador. Sem framework, sem build, sem backend.
Funciona via `file://` e em qualquer servidor, inclusive legados.

## Publicação

Envie todos os arquivos e pastas para a raiz do servidor (ou subpasta). A página inicial é `index.html`.

## O que editar

### Link de destino e contatos → `assets/js/config.js`

Único ponto de configuração dinâmica:

```js
window.SITE_CONFIG = {
  ctaUrl: "#",         // URL de destino dos botões CTA (ex.: "https://...")
  ctaLabel: "Quero estruturar projetos no meu município",
  whatsapp: ""         // apenas dígitos com DDI+DDD (ex.: "5531999999999") — vazio oculta
};
```

Enquanto `ctaUrl` for `"#"`, os botões rolam até a seção de contato da própria página.

## Estrutura

```
index.html               Página única (todas as seções)
favicon.svg              Ícone do site (fallback SVG)
assets/
  css/styles.css         Design system: tokens, layout, responsividade
  js/config.js           Configuração do site  ← edite aqui
  js/main.js             Interações: menu mobile, scroll, animações, CTA
  img/                   Logos e imagens (amm.png, ipgc.png, amm-saneamento.png)
```

## Base legal

- Lei Federal 8.987/1995 — Concessões
- Lei Federal 11.079/2004 — Parcerias Público-Privadas
- Lei Federal 13.019/2014 — Parcerias com a Sociedade Civil
- Foro: Comarca de Belo Horizonte/MG
