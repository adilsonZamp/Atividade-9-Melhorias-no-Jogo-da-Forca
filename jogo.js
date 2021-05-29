let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaSecundaria: document.getElementById('secundaria'),
  telaNovaPalavra: document.getElementById('formulario-nova-palavra'),
  telaJogo: document.getElementById('jogo'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  dica: document.querySelector('.dica'),

  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    reiniciar: document.querySelector('.reiniciar'),
    novaPalavra: document.querySelector('.botao-nova-palavra'),
    novaPalavraConcluir: document.querySelector('.botao-nova-palavra-concluir'),
  },

  boneco: [
    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),
  ],

  inputNovaPalavra: document.getElementById('input-nova-palavra'),
  inputNovaDica: document.getElementById('input-nova-dica'),
  inputNovaDificuldade: document.getElementById('select-dificuldade'),
};

const palavras = {
  facil: [
    { palavra: 'sagaz', dica: 'Que não se deixa enganar' },
    { palavra: 'negro', dica: 'Cuja coloração é escura' },
    { palavra: 'âmago', dica: 'A parte que fica no centro' },
    { palavra: 'êxito', dica: 'Resultado satisfatório' },
    { palavra: 'ímpar', dica: 'Que não é divisível por dois' },
    { palavra: 'termo', dica: 'Parte constituinte' },
    { palavra: 'algoz', dica: 'Aquilo que aflige ou atormenta' },
    { palavra: 'senso', dica: 'Faculdade de julgar' },
    { palavra: 'nobre', dica: 'Que tem título nobiliárquico' },
    { palavra: 'plena', dica: 'Que está completo' },
  ],

  medio: [
    { palavra: 'cônjuge', dica: 'Aquele com que é casado' },
    { palavra: 'exceção', dica: 'Desvio de uma regra' },
    { palavra: 'efêmero', dica: 'O que dura pouco' },
    { palavra: 'prolixo', dica: 'Que tende a arrastar-se' },
    { palavra: 'idílico', dica: 'Caráter puro ou maravilhoso' },
    { palavra: 'caráter', dica: 'Conjunto de traços morais' },
    { palavra: 'análogo', dica: 'Que ou o que é semelhante' },
    { palavra: 'genuíno', dica: 'Que não sofreu nenhuma alteração em sua fórmula' },
    { palavra: 'estória', dica: 'Narrativa de cunho popular e tradicional' },
    { palavra: 'sublime', dica: 'Que apresenta inexcedível perfeição material' },
  ],

  dificil: [
    { palavra: 'essencial', dica: 'Que constitui o mais básico' },
    { palavra: 'plenitude', dica: 'Estado do que é inteiro' },
    { palavra: 'paradigma', dica: 'Um exemplo que serve como modelo' },
    { palavra: 'hipócrita', dica: 'Aquele que demonstra uma coisa, quando sente ou pensa outra' },
    { palavra: 'corolário', dica: 'Proposição que deriva, em um encadeamento dedutivo' },
    { palavra: 'dicotomia', dica: 'Divisão em duas partes iguais' },
    { palavra: 'hegemonia', dica: 'Supremacia, influência preponderante exercida por cidade, povo, país etc.' },
    { palavra: 'propósito', dica: 'Aquilo que se busca alcançar' },
    { palavra: 'ratificar', dica: 'Reafirmar o que foi declarado' },
    { palavra: 'esdrúxulo', dica: 'Fora dos padrões comuns e que causa espanto ou riso' },
  ],
};

const novoJogo = () => {
  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,
    definirPalavra: function (palavra, dica) {
      this.palavra.original = palavra;
      this.palavra.dica = dica;
      this.palavra.tamanho = palavra.length;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
    },
    jogar: function (letraJogada) {
      let acertou = false;

      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }

      if (!acertou) {
        this.chances--;
      }

      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex';
  elementos.telaSecundaria.style.display = 'flex';
  elementos.telaJogo.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você Ganhou!</p>' : '<p>Que pena!</p><p>Você Perdeu!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex ';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
};

const sortearPalavra = () => {
  const d = jogo.dificuldade;
  const i = Math.floor(Math.random() * palavras[d].length);

  const palavra = palavras[d][i].palavra;
  const dica = palavras[d][i].dica;

  jogo.definirPalavra(palavra, dica);
  console.log(jogo.palavra.original);
  return jogo.palavra.original;
};

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const mostrarDica = () => {
  const dica = jogo.palavra.dica;
  elementos.dica.textContent = dica;
};

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaSecundaria.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';

  sortearPalavra();
  mostrarPalavra();
  mostrarDica();
};

const novaPalavra = () => {
  elementos.telaInicial.style.display = 'none';
  elementos.telaSecundaria.style.display = 'none';
  elementos.telaNovaPalavra.style.display = 'flex';
};

const voltarTelaPrincipal = () => {
  elementos.telaInicial.style.display = 'flex';
  elementos.telaSecundaria.style.display = 'flex';
  elementos.telaNovaPalavra.style.display = 'none';
};

const novaPalavraConcluir = () => {
  const novaPalavra = elementos.inputNovaPalavra.value;
  const novaDica = elementos.inputNovaDica.value;
  const novaDificuldade = elementos.inputNovaDificuldade.value;

  palavras[novaDificuldade].push({palavra: novaPalavra, dica: novaDica});

  console.log(palavras[novaDificuldade]);
  
  voltarTelaPrincipal();
};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());
elementos.botoes.novaPalavra.addEventListener('click', () => novaPalavra());
elementos.botoes.novaPalavraConcluir.addEventListener('click', () => novaPalavraConcluir());

novoJogo();
