package com.example.urlshortener.services

import com.example.urlshortener.entities.URLReference


interface URLReferenceService {
    fun getURLReference(urlHash: String): URLReference?
    fun getAllURLReferenceByCreatedAtDesc(): Collection<URLReference>
    fun createURLReference(url: String): URLReference
    fun updateURLReference(id: Long, url: String): URLReference?
    fun deleteURLReference(id: Long): URLReference?
}
