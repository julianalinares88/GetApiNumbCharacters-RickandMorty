export const getData = async () =>{
    try {
        const data = await fetch('https://rickandmortyapi.com/api/character').then(res => res.json())
        //se espera a que vaya por la data
        //Al final la promesa se cumple y se retorna la data en un json ----> "then"
        
        console.log(data)
        return data
        //Se retorna la data para cuando se ejecuta esta funcion para usar la data -que aun no se esta usando-
    } catch (error) {
        console.log(error)
    }
}
export const episodeCharacter = async ( url:string) => {
    try {
        const dataEpisode = await fetch(
            url
        );
        const episode = await dataEpisode.json();
        return episode;
    } catch (error){
        console.log(error)
    }
};
