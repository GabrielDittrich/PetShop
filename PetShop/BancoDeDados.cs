using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    //Configuração da conexão
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=restaurante;user=root;password=positivo");
    }

    //Mapeamento das tabelas
    public DbSet<Animal> Animais { get; set; }
}
