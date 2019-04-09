# Hangfire

Recentemente mi è stata assegnata una *user story* in cui si richiedeva di integrare **Hangfire** nel progetto esistente e capire successivamente come creare dei _jobs_.

Hangfire è una libreria disponibile per **_.NET_**_ e **_.NET Core_** che consente di schedulare jobs in _background_ senza l'ausilio di _Windows Service_ o ulteriori processi esterni.
Non conoscendolo la prima cosa che ho fatto è stato affidarmi completamente alla sua  **[documentazione](https://docs.hangfire.io/en/latest/)** che sembra fatta molto bene. Le componenti principali di Hangfire sono:

- **Client** - Responsabile della creazione dei jobs.
- **Job Storage** - Fornisce un servizio di persistenza per i jobs e le relative informazioni.
- **Server** - Recupera i dati dallo storage e li processa.

![1](/image1.png)

Ma ritorniamo ai task della user story. Per mostrare ciò che ho fatto ho realizzato una semplice applicazione partendo da un template di _Visual Studio_ in particolare ho scelto di creare una ASP.NET Core Web Application con _Front- end_ realizzato in Angular. L'applicazione prevede una semplice Homepage dove è è presente un _button_, la cui pressione non farà altro che scatenare l'incremento di un contatore. Tale azione la trasformeremo in un job che sarà schedulato con Hangfire.

![2](/image2.png)

Andiamo quindi ad integrare Hangfire nel nostro progetto aggiungendo il relativo pacchetto *Nuget*.

![3](/image3.png)

All'interno dello _Startup.cs_ registriamo Hangfire tra i servizi ed aggiungiamo alla configurazione l'_Hangfire Server_.

```csharp{.line-numbers}
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        //...some code

        // Add Hangfire services
        services.AddHangfire(s => s.UseSqlServerStorage(Configuration.GetConnectionString("HangfireDemo")));

        //...some code
    }
    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        //...some code

        //Hangfire
        app.UseHangfireServer();
        app.UseHangfireDashboard("/hangfire");

        //...some code

    });
```

Come possiamo notare, quando registriamo Hangfire, viene definito lo storage per i nostri jobs. Per semplicità si è scelto di utilizzare l'istanza locale di SQLServer  dove è stato creato un nuovo DataBase (*HangfireDemoDB*) ma è possibile utilizzare anche altri tipi di storage come Database NoSQL come **MongoDB** oppure soluzioni _in-memory_ come **Redis**. 

![4](/image4.png)

Successivamente, all'interno del file *appsettings.json* è stata definita la stringa di connessione al DB.

```json{.line-numbers}
    "ConnectionStrings": {
        "HangfireDemo": "Server=(LocalDb)\\MSSQLLocalDB;Database=HangfireDemoDB; Trusted_Connection=True;MultipleActiveResultSets=true"
    }
```

All'avvio dell'applicazione verranno create diverse tabelle che come abbiamo detto conterranno i job e le relative informazioni.

![5](/image5.png)

La pressione del bottone "Increment Counter" scatena una richesta *HTTP PUT* con la quale passiamo al Backend il valore corrente del nostro counter. Sarà proprio all'interno del _Controller_ che gestisce tale richiesta che andremo a schedulare i nostri jobs la cui azione sarà quella di incrementare il valore del counter.

```csharp{.line-numbers}
    [HttpPut]
    [Route("[action]")]
    public void SendCurrentCounter([FromBody] Counter currentCounter)
    {
        counter.Value = currentCounter.Value;
        BackgroundJob.Enqueue(() => incrementCounter());
    }
    
    public void incrementCounter()
    {
        counter.Value++;
    }
```
Il il job che andiamo a schedulare è di tipo **_fire-and-forget_** che più si appresta al nostro esempio ma con Hangfire possiamo schedulare anche altre tipologie come ad esempio i **_delayed jobs_** e cioè jobs schedulati dopo un certo periodo di tempo oppure **_recurring jobs_** ovvero jobs che devono essere eseguiti con una certa cadenza.
Nella configurazione del nostro esempio abbiamo anche aggiunto la dashboard di Hangfire raggiungibile, nel nostro caso, all'indirizzo `[host]:[port]/hangfire`. Infatti viene messa a disposizione questa interfaccia grafica con cui possiamo avere innanzitutto una rappresentazione grafica dei jobs ed in più fornisce tante informazioni utili a corredo come ad esempio i jobs correttamente schedulati o quelli falliti.
Di seguito vediamo il risultato dello scheduling di dieci jobs sulla dashboard e sul DB.

![6](/image6.png)
![7](/image7.png)

e sul DB.

![8](/image8.png)

È stato molto interessante lavorare a questo task e spero possa risultare tale  anche per voi.  
Happy Coding!