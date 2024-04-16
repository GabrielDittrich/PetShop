using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Configuração Swagger no builder
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Configuração banco MySQL
builder.Services.AddDbContext<BancoDeDados>();

var app = builder.Build();

//Configuração Swagger no app
app.UseSwagger();
app.UseSwaggerUI();

//  http://localhost:xxxx/swagger/index.html

app.MapGet("/", () => "PetShop");

app.MapGet("/animais", async (BancoDeDados db) =>
    //select * from pessoas
    await db.Animais.ToListAsync()
);

app.MapPost("/animais", async (Animal animal, BancoDeDados db) =>
{
    db.Animais.Add(animal);
    //insert into...
    await db.SaveChangesAsync();

    return Results.Created($"/animais/{animal.Id}", animal);
}
);

app.MapPut("/animais/{id}", async (int id, Animal animalAlterado, BancoDeDados db) =>
{
    //select * from pessoas where id = ?
    var animal = await db.Animais.FindAsync(id);
    if (animal is null)
    {
        return Results.NotFound();
    }
    animal.nomeAnimal = animalAlterado.nomeAnimal;
    animal.raca = animalAlterado.raca;

    //update....
    await db.SaveChangesAsync();

    return Results.NoContent();
}
);

app.MapDelete("/animais/{id}", async (int id, BancoDeDados db) =>
{
    if (await db.Animais.FindAsync(id) is Animal animal)
    {
        //Operações de exclusão
        db.Animais.Remove(animal);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
}
);

app.Run();
