package com.example.urlshortener.repositories

import com.example.urlshortener.entities.URLReference
import org.springframework.data.repository.CrudRepository


interface URLReferenceRepository : CrudRepository<URLReference, Long> {
    fun findByURLHash(urlHash: String): URLReference?
}
