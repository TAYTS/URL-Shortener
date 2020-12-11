package com.example.urlshortener.services

import com.example.urlshortener.entities.URLReference
import com.example.urlshortener.repositories.URLReferenceRepository
import org.springframework.stereotype.Service
import java.security.MessageDigest
import javax.xml.bind.DatatypeConverter

@Service
class URLReferenceServiceImp(private val repository: URLReferenceRepository) : URLReferenceService {
    override fun getURLReference(urlHash: String): URLReference? = repository.findByURLHash(urlHash)

    override fun getAllURLReference(): Collection<URLReference> {
        TODO("Not yet implemented")
    }

    override fun createURLReference(url: String): URLReference {
        val bytes = MessageDigest.getInstance("SHA-512").digest(url.toByteArray())
        val urlHash = DatatypeConverter.printHexBinary(bytes).substring(0, 15)
        var urlReference = repository.findByURLHash(urlHash)
        println("URL Reference: $urlReference")
        println("URL hash: $urlHash")
        if (urlReference == null) {
            println("Create new")
            urlReference = URLReference(originalURL = url, URLHash = urlHash)
            repository.save(urlReference)
        }

        return urlReference
    }

    override fun updateURLReference(id: Long, url: String): URLReference? {
        TODO("Not yet implemented")
    }

    override fun deleteURLReference(id: Long): URLReference? {
        TODO("Not yet implemented")
    }
}
