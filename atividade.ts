// Classe Livro
class Livro {
  public id: string;
  public titulo: string;
  public autor: string;
  public genero: string;
  public paginas: string;
  public disponivel: boolean;

  constructor(
    id: string,
    titulo: string,
    autor: string,
    genero: string,
    paginas: string,
    disponivel: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.paginas = paginas;
    this.disponivel = disponivel;
  }

  public exibirLivro(): void {
    console.log(`
      ID: ${this.id}
      Título: ${this.titulo}
      Autor: ${this.autor}
      Gênero: ${this.genero}
      Páginas: ${this.paginas}
      Disponível: ${this.disponivel ? "Sim" : "Não"}
    `);
  }
}

//Classe Usuário
class Usuario {
  public nome: string;
  public idUsuario: string;
  public livrosEmprestados: Livro[];

  constructor(nome: string, idUsuario: string) {
    this.nome = nome;
    this.idUsuario = idUsuario;
    this.livrosEmprestados = [];
  }

  public exibirUsuario(): void {
    console.log(`Usuário: ${this.nome} (ID: ${this.idUsuario})`);
    if (this.livrosEmprestados.length > 0) {
      console.log("Livros emprestados:");
      this.livrosEmprestados.forEach(l => console.log(` - ${l.titulo}`));
    } else {
      console.log("Nenhum livro emprestado.");
    }
  }
}

//Classe Biblioteca
class Biblioteca {
  public nome: string;
  public endereco: string;
  public livrosDisponiveis: Livro[];
  public livrosEmprestados: Livro[];

  constructor(nome: string, endereco: string) {
    this.nome = nome;
    this.endereco = endereco;
    this.livrosDisponiveis = [];
    this.livrosEmprestados = [];
  }

  public adicionarLivro(livro: Livro): void {
    this.livrosDisponiveis.push(livro);
  }

  public exibirBiblioteca(): void {
    console.log(`Biblioteca: ${this.nome}\nEndereço: ${this.endereco}`);
  }

  public emprestarLivro(livro: Livro, usuario: Usuario): void {
    if (livro.disponivel) {
      livro.disponivel = false;
      this.livrosEmprestados.push(livro);
      this.livrosDisponiveis = this.livrosDisponiveis.filter(l => l.id !== livro.id);
      usuario.livrosEmprestados.push(livro);

      console.log(`O livro "${livro.titulo}" foi emprestado para ${usuario.nome}.`);
    } else {
      console.log(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
    }
  }

  public devolverLivro(livro: Livro, usuario: Usuario): void {
    const indice = usuario.livrosEmprestados.findIndex(l => l.id === livro.id);
    if (indice !== -1) {
      livro.disponivel = true;
      usuario.livrosEmprestados.splice(indice, 1);
      this.livrosEmprestados = this.livrosEmprestados.filter(l => l.id !== livro.id);
      this.livrosDisponiveis.push(livro);

      console.log(`O livro "${livro.titulo}" foi devolvido por ${usuario.nome}.`);
    } else {
      console.log(`O usuário ${usuario.nome} não possui esse livro emprestado.`);
    }
  }
}


let livro1 = new Livro("0001-0", "The Way of Kings", "Brandon Sanderson", "Fantasia", "1252", true);
let livro2 = new Livro("0002-0", "Mistborn", "Brandon Sanderson", "Fantasia", "700", true);

let biblioteca1 = new Biblioteca("Biblioteca Setorial", "Rua dos Bobos, Nº 0");

biblioteca1.adicionarLivro(livro1);
biblioteca1.adicionarLivro(livro2);

let usuario1 = new Usuario("Ed", "U001");

biblioteca1.emprestarLivro(livro1, usuario1);
biblioteca1.devolverLivro(livro1, usuario1);
