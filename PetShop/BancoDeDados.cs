using Microsoft.EntityFrameworkCore;
class BancoDeDados : DbContext
{

    //Mapeamento das tabelas
    public DbSet<Animal> Animais { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pessoa> Pessoas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=5119;database=petshop;user=root;password=");
    }
    //Comandos dotnet
    //dotnet ef migrations add CriarTabelaProduto
    //dotnet ef database update

}
