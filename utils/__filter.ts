/* eslint-disable import/no-anonymous-default-export */
import { IFilmCard, IPersonCard } from '../interfaces/index'

export function __filterByGenre(crt: string, arr: IFilmCard[]) {
    if (crt === "all") return arr;
    if (crt !== "all") {
        if (crt !== "") {
            crt = crt[0].toUpperCase() + crt.slice(1);
        };

        return (
            arr.filter((film) => {
                return (
                    film.genres[0] === crt ||
                    film.genres[1] === crt ||
                    film.genres[2] === crt ||
                    film.genres[3] === crt
                );
            })
        );
    };
};

export function __filterByYear(crt: string, arr: IFilmCard[]) {
    if (crt === "all") return arr;
    if (crt !== "all") {
        return (
            arr.filter((film) => {
                return (film.year && film.year[2] === crt[2]);
            })
        )
    };
};

export function __filterByYearsPersons(crt: string, arr: IPersonCard[]) {
    if (crt === "all") return arr;
    if (crt !== "all") {
        return (
            arr.filter((person) => {
                return person.yearsPopular[0][2] === crt[2];
            })
        );
    };
};

export function __filterByCountry(crt: string, arr: IPersonCard[]) {
    if (crt === "all") return arr;
    if (crt !== "all") {
        return (
            arr.filter((film) => {
                return (
                    film.countries[0] === crt ||
                    film.countries[1] === crt ||
                    film.countries[2] === crt
                );
            })
        );
    };
};

export function __filterFilms(crts: [string, string?], arr: IFilmCard[]) {
    return crts[1] && __filterByGenre(crts[0], __filterByYear(crts[1], arr) as IFilmCard[])
}

export function __filterPersons(crts: [string, string?], arr: IPersonCard[]) {

    return crts[1] && __filterByCountry(crts[0], __filterByYearsPersons(crts[1], arr) as IPersonCard[])
}

export default {
    __filterFilms,
    __filterPersons
};