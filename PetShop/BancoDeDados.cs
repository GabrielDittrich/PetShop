using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    //Configuração da conexão
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=petshop;user=root;password=positivo");
    }

    //Mapeamento das tabelas
    public DbSet<Animal> Animais { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pessoa> Pessoas { get; set; }


    //Comandos dotnet
    //dotnet ef migrations add CriarTabelaProduto
    //dotnet ef database update
}
