# Articolo-2
Articolo su Hangfire

In una story che mi è stata assegnata veniva richiesto di capire come integrare hangfire nel progetto esistente e quindi come creare dei jobs.
La prima cosa che ho fatto naturalmente è capire cosa fosse hangfire. 
Hangfire è un worker in background etc etc

Hangfire consente di creare diversi tipi di jobs. ad esempio ... etc etc 

Hangfire richiede per il suo funzionamento la presenza di un database, 


Per fare un esempio di come integrare hangfire il un progetto consideriamo il seguente esempio, dove abbiamo un'applicazione realizzata in .net core e con frontend angular dove supponiamo che alla pressione di un tasto debba essere  eseguita una determinata azione tradotta quindi in un job.
per l'applicazione su cui stavo lavorando il db era mysql quindi utilizziamo come db un'istanza dockerizzata di mysql.

andiamo quindi ad integrare hangfire nel progetto corrente e successivamente andiamo a definre il job che sarà lanciato in seguito alla pressione del tasto.


